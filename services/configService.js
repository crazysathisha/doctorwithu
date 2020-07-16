const config = require('config');

exports.getDBConfigUrl = () => {
    return config.mongo.url;
}

