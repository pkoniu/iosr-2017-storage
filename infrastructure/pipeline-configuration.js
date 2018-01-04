const {
    HEROKU_APP_NAME = 'iosr2017storage'
} = process.env;

module.exports = {
    name: 'iosr2017-storage-pipeline',
    apps: {
        staging: `${HEROKU_APP_NAME}-staging`,
        production: `${HEROKU_APP_NAME}-production`
    }
};