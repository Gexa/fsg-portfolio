const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                debug: true,
                /* MySQL */
                mysql_host: 'localhost',
                mysql_port: '3306',
                mysql_user: '',
                mysql_password: '',
                mysql_db: '',
                /* NoSQL */
                mongo_protocol: 'mongodb://',
                mongo_host: 'localhost:27017',
                mongo_user: '',
                mongo_pass: '',
                mongo_db: 'portfolio'
            },
        }
    }

    return {
        env: {
            debug: false,
            /* MySQL */
            mysql_host: 'localhost',
            mysql_port: '3306',
            mysql_user: '',
            mysql_password: '',
            mysql_db: '',
            /* NoSQL */
            mongo_protocol: 'mongodb://',
            mongo_host: 'localhost:27017',
            mongo_user: '',
            mongo_pass: '',
            mongo_db: 'portfolio'
        },
    }
}