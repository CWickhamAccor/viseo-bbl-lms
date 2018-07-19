module.exports = {
    apps: [
        {
            name: 'viseo-bbl-lms',
            script: './index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
    ],
};
