const mongoose = require("mongoose");

const db =
    _ENV == "production" ?
    require("../_configs/.db-env") :
    require("../_configs/db");

if (_ENV === "testing" || _ENV === "development") {
    var uri = "mongodb://" + db.host + ":" + db.port + "/" + db.database;
    console.log("URI-DB: " + uri);
} else if (_ENV === "production") {
    // #### MONGO_URL llega desde docker-compose.yml el otro es para productionHere sin docker
    var uri =
        process.env.MONGO_URL ||
        "mongodb://" +
        db.user +
        ":" +
        db.password +
        "@" +
        +db.host +
        ":" +
        db.port +
        "/" +
        db.database;
    console.log("URI-DB: " + uri);
}
mongoose.set('strictQuery', false);

// console.log("URI-DB: " + uri);
mongoose.connect(uri, (error) => {
    if (error) {
        console.log('########## CONNECTION ERROR ##########', error)
    } else {
        console.log(
            `connection to database, in ` +
            _ENV +
            `, established well: ` +
            db.port
        );
        console.log(
            "**********************************************************************"
        );
    }

})


// mongoose.connection
//     .on("error", (err) => console.error.bind(console, "Connection:" + err)) // enlaza el track de error a la consola (proceso actual)
//     .once("open", () => {
//         console.log(
//             `connection to database, in ` +
//             _ENV +
//             `, established well: ` +
//             db.port
//         );
//         console.log(
//             "**********************************************************************"
//         );
//     });

module.exports = mongoose;