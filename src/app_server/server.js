/* ##########  MODULOS O PAQUTES REQUERIDOS  #################### */
const https = require("https"); /////////////////////////////////////////////////////////////////////////
/* ##########  api - express            ################################# */
const api = require("./app");
/* ##########  api - express            ################################# */
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/* ##########  SERVIDOR ESCUCHANDO  ############################# */
// servidor secure layer transport SSL https://www.avr3dstudio.com:3000
if (_ENV == "production") {
    // app.use(cors()); // HASK: ############# CORS CONFIGURATION IN PRODUCTION
    const credentials = {
        ca: fs.readFileSync(__dirname + "_configs/ssl/captionsconnection_net.ca-bundle", 'utf8'), //la certification authority o CA
        key: fs.readFileSync(__dirname + "_configs/ssl/captionsconnection_net.key", 'utf8'), //la clave SSL, que es el primer archivo que generamos ;)
        cert: fs.readFileSync(__dirname + "_configs/ssl/captionsconnection_net.crt", 'utf8') //el certificado
    };
    var _server = https
        .createServer(credentials, api)
        .listen(api.get("port"), function() {
            console.log("NODE_ENV: " + api.get("env"));
            console.log(
                "Express server with SSL certificate listening in https://www.captions-connection-app.net:" +
                _server.address().port
            );
        });
    // var _server = api.listen(api.get("port"), () => {
    //     console.log(
    //         "Express PRODUCTION server listen in http://localhost:",
    //         _PORT
    //     );
    // });
} else {
    var _server = api.listen(api.get("port"), () => {
        console.log(
            "*********************************************************************"
        );
        console.log(
            "Express server listening in http://localhost:" +
            _server.address().port
        ); // _PORT
        console.log(
            "---------------------------------------------------------------------"
        );
        _PRINT.Console("PrintConsole", "Print Console", _ENV);
        console.log(
            "---------------------------------------------------------------------"
        );
    });
}
/* ##########  SERVIDOR ESCUCHANDO  ############################# */
////////////////////////////////////////////////////////////////////
module.exports = _server;