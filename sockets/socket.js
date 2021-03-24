"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("../clases/usuarios-lista");
const usuario_1 = require("../clases/usuario");
const mapa_1 = require("../clases/mapa");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.mapa = new mapa_1.Mapa();
// evento de mapa
exports.mapaSockets = (cliente, io) => {
    cliente.on('marcador-nuevo', (marcador) => {
        exports.mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', (id) => {
        exports.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('marcador-mover', (marcador) => {
        exports.mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje Recibido', payload);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        io.emit('mensaje-nuevo', payload);
    });
};
// Configurar Usuario
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        // console.log('Configurando  Usuario', payload.nombre)
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        // io.emit('mensaje-nuevo',payload ); 
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
// Obtener Usuarios
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
