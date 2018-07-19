const logger = require('../tools/logger');
const {lms, fallback} = require('../database/lmsDatabase');

function parse(req, res) {
    const { intent, entities } = req.body;
    logger.info(`intent: ${intent}`);
    const output = getOutputText(intent, entities);
    logger.info(`output: ${output}`);
    res.json({ output });
}

function getOutputText(intent, entities) {
    let output = 'default text';
    const resultsMatchingIntent = lms.filter((elem) => elem.intent === intent);
    const sortedResults = getSortedResults(resultsMatchingIntent, entities);
    logger.info(`results matching intent : ${JSON.stringify(sortedResults, null, 2)}`);
    if (sortedResults.length > 0){
        output = sortedResults[0].output;
    } else {
        const index = Math.round(Math.random()*fallback.length);
        output = fallback[index];
    }
    return output;
}

function getSortedResults(array, entities) {
    return array.map((e) => {
        e.match = getEntitiesScore(e.entities, entities);
        return e;
    }).sort((e1, e2) => e1.match < e2.match);
}

function getEntitiesScore(LmsEntities, ReqEntities) {
    if (!LmsEntities) return 0;
    let score = 0;
    logger.info('lms : ', LmsEntities);
    logger.info('req : ', ReqEntities);
    logger.info('');
    for(const entity in ReqEntities) {
        if (LmsEntities[entity]) {
            if (LmsEntities[entity] === '*') {
                score ++;
                logger.info('partial match');
            }
            if (LmsEntities[entity] === ReqEntities[entity]) {
                score += 2;
                logger.info('full match');
            }
        }
    }
    return score;
}

module.exports = {
    parse,
};