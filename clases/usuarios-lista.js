"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // agregar un Usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('=== Actualizando Usuario ===');
        console.log(this.lista);
    }
    // Obtener Lista
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    // Obtener un usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // Obtener usuarip de una sala en particular
    getUsuarioEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    // Borrar Usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id != id);
        // console.log(this.lista )
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
