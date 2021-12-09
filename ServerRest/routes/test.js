module.exports = function (app, gestorBD) {
    // Coger todo
    app.get('/datos', function (req, res) {
        gestorBD.obtenerItem({}, 'objetos', function(result) {
            if (result==null)
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener el dato, intentelo de nuevo más tarde" } })
            else {
                res.send({status: 200, data: {datos: result}});
            } 
        });
    });

    // Poner item
    app.post('/datos/add', function (req, res) {
        gestorBD.insertarItem(req.body, 'objetos', function(result){
            console.log(req.body);
            if (result == null){
                console.log("WARN: Fallo al insertar un viaje.");
                res.send({ Error: { status: 500, data: "Se ha producido un error al insertar el objeto, intentelo de nuevo más tarde" } })
            }else{
                res.send({status: 200, data:{msg: 'Objeto insertado'}});
            }
        });
    });

    // Borrar datos
    app.post('/datos/delete', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.body.id)};
        gestorBD.eliminarItem(criterio, 'objetos', function(result){
            if (result==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error al borrar el objeto, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data:{msg: 'Objeto eliminado'}});
            }
        });
    });

    // Coger dato con id
    app.get('/datos/find/:id', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        gestorBD.obtenerItem(criterio, 'objetos', function(result){
            if(result==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error inesperado, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: result});
            }      
        })
    });

    app.post('/datos/edit/:id', function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        let objeto = req.body;
        gestorBD.modificarItem(criterio, objeto, 'objetos', function(result){
            if (result==null)
                res.send({ Error: { status: 500, data: "Se ha producido un error al editar el usuario, intentelo de nuevo más tarde" } })
            else {
                res.send({status: 200, data: {msg: 'Usuario editado correctamente'}})
            }
        });
    });
}
