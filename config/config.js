const env = process.env.NODE_ENV || 'development';

//CONFIGURATION FOR DEV ENVIRONMENT
const development = {
    DATABASE_CONFIG: {     
        url: 'mongodb://localhost:27017',
        database: 'test1'
        // url: 'mongodb+srv://username:pwd@cluster0-csdgi.mongodb.net/admin?retryWrites=true&w=majority',
        // database: 'sms'
    },
    PORT: 9000
};

//PLEASE FILL THE VALUES FOR PRODUCTION ENVIRONMENT
const production = {
    DATABASE_CONFIG: {
        url: 'mongodb://localhost:27017',
        database: 'production'
    },
    PORT: 8000
};

//PLEASE FILL THE VALUES FOR TEST ENVIRONMENT
const test = {
    DATABASE_CONFIG: {   
        url: 'mongodb://localhost:27017',
        database: 'test'
    },
    PORT: 8000
};

const config = {
    development,
    production,
    test
};

module.exports = config[env];