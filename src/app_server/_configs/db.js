// var env = process.env.NODE_ENV || 'development';
////console.log(env);
const configDB = {
    testing: {
        host: "localhost",
        port: 27017, //puerto que requiere --auth
        database: "DB_CCApp_test",
    },
    development: {
        // user: "cc_app",
        // password: "JMLB_1234_ppcs_2709",
        host: "localhost",
        port: 27017, //puerto que requiere --auth
        database: "DB_CCApp", // base de datos con data y auth
    }, // mongodb://<dbuser>:<dbpassword>@<host>:<port>/<dbname>
};

module.exports = configDB[_ENV];