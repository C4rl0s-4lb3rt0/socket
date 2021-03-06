"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class graficaData {
    constructor() {
        this.meses = ['enero', 'febrero', 'marzo', 'abril'];
        this.valores = [0, 0, 0, 0];
    }
    getDataGrafica() {
        return [
            { data: this.valores, label: 'Ventas' }
        ];
    }
    incrementarValor(mes, valor) {
        mes = mes.toLowerCase().trim();
        for (let i in this.meses) {
            if (this.meses[i] === mes) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGrafica();
    }
}
exports.graficaData = graficaData;
