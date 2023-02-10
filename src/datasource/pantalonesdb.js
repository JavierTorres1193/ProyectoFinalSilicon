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

var pantalonesdb = {};


pantalonesdb.getAll = function (funCallback) {
    connection.query("SELECT * FROM pantalones where estado >=A", function (err, result, fields) {
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
pantalonesdb.logdelete = function (idpantalones, funCallback) {
    connection.query("UPDATE pantalones SET estado = C WHERE idpantalones = ?",idpantalones, function (err, result, fields) {
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
                    message: `No se encontro el id  ${idpantalones} de la prenda`,
                    detail: result
                }); 
            } else {
         //       console.error(err);
                    funCallback({
                    code:A,
                    message: `Se modifico la prenda con el id ${idpantalones}`,
                    detail: result
                }); 
            }
        }
    });
}

module.exports = pantalonesdb;