require("rootpath")();
const express = require('express');
const app = express();
const remerasdb = require("../datasource/remerasDB");

app.get('/', getAll);
app.delete('/:editremeras', eliminacionlogica);

function getAll(req, res) {
    remerasDb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

// eliminacion logica

function eliminacionlogica(req, res) {
    remerasdb.logdelete(req.params.idremeras, function (result) {
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

var query = 'UPDATE remeras SET  = ? , talle = ?, color = ?,  cantidad = ?'
    var dbParams = [remerasdb.talle, remerasdb.color, remerasdb.cantidad];
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
                    message: `No se encontro la prenda ${idremeras}`,
                    detail: result
                });
            } else {
                funCallback({
                    code:A,
                    message: `Se modifico la prenda ${idremeras}`,
                    detail: result
                });
            }
        }
    });

module.exports = app;