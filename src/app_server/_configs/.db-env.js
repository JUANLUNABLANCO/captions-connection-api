// debes decidir en produccion cual va a ser el sistema de base de datos
// productionLocal o productionRemote
// en este punto _ENV = 'produciton'
// pero la estartegia debemos indicársela

const configDB = {
    production: {
        host: "localhost",
        port: 27017,
        database: "DB_captions_connection_prod",
    }
};

module.exports = configDB[_ENV];