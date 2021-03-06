"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
//aplico el patron singleton para instanciar una sola vez a server
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            },
        });
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('Escuchando conexiones');
        this.io.on('connection', (cliente) => {
            console.log('Cliente conectado');
            // configuracion de mapas
            socket.mapaSockets(cliente, this.io);
        });
    }
    iniciar(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
