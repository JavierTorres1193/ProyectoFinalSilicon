const mysql = require('mysql');
const config = require("../config/config.json");

//conectarnos a nuestra DB
var connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Conectada correctamente");
    }
});
//fin de conexion db

var mallasDb = {};


mallasDb.getAll = function (funCallback) {
    connection.query("SELECT * FROM mallas where estado >=A", function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            funCallback(undefined, result);
        }
    })
}
   
// eliminacion logica
mallasDb.logdelete = function (idmallas, funCallback) {
    connection.query("UPDATE mallas SET estado = C WHERE idmallas = ?",idmallas, function (err, result, fields) {
        if (err) {
            funCallback({
                code:C,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            }); 
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:B,
                    message: `No se encontro el id  ${idmallas} de la prenda`,
                    detail: result
                }); 
            } else {
         //       console.error(err);
                    funCallback({
                    code:A,
                    message: `Se modifico la prenda con el id ${idmallas}`,
                    detail: result
                }); 
            }
        }
    });
}

module.exports = mallasDb;