const logger = require('./tools/logger');
const app = require('express')();
const bodyParser = require('body-parser');
const { parse } = require('./service/parseEndPoint');

app.use(bodyParser.json({limit: '50mb'}));

app.post('/parse', (req, res) => {
    logger.info('[PARSE]Lms has been called !');
    parse(req, res);
});

app.listen(8080, () => {
    logger.info('Lms is listening on port 8080');
});