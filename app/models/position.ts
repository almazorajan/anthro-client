import { Module } from './models'; 

export class Position {

    constructor() {
        this.positionName = "";
        this.modules = [new Module()];
    }

    _id: string;
    positionName: string;
    modules: Module[];
}