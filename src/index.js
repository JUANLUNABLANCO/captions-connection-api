require('dotenv').config();
global._ENV = process.env.NODE_ENV || "development";
console.log(_ENV);
/* ########### Server ############################################## */
const Server = require("./app_server/server");
/* ########### Server ############################################## */
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  CONEXION A BASE DE DATOS     #################### */
const DB_conexion = require("./app_server/_connections/db_connect");
/* ##########  CONEXION A BASE DE DATOS     #################### */
////////////////////////////////////////////////////////////////////
const MyApp = {
    Server,
    DB_conexion,
};

module.exports = MyApp;