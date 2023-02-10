require("rootpath")();
const express = require('express');
const app = express();

const pantalonesdb = require("../datasource/pantalonesDB");

app.get('/', getAll);
app.delete('/:editpantalones', eliminacionlogica);

function getAll(req, res) {
    pantalonesdb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

// eliminacion logica

function eliminacionlogica(req, res) {
    pantalonesdb.logdelete(req.params.idpantalones, function (result) {
        if (result.code == C) {
            res.status(500).send(err);
        } else if (result.code == B) {
                res.status(404).json(result);  
        } else if (result.code == A) {      
            res.json(result);
        }
    });
}


// editar

var query = 'UPDATE pantalones SET  = ? , talle = ?, color = ?,  cantidad = ?'
    var dbParams = [pantalonesdb.talle, pantalonesdb.color, pantalonesdb.cantidad];
    connection.query(query, dbParams, function (err, result, fields) {
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
                    message: `No se encontro la prenda ${idpantalones}`,
                    detail: result
                });
            } else {
                funCallback({
                    code:A,
                    message: `Se modifico la prenda ${idpantalones}`,
                    detail: result
                });
            }
        }
    });

module.exports = app;