const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

module.exports = (phase) => {

    const webpack = (config, options) => {
        /* config.module.rules.push(
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ) */
        return config
    }

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            webpack: webpack,
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
        sassOptions: {
            includePaths: [path.join(__dirname, 'assets', 'scss')],
        },
        env: {
            webpack: webpack,
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