import { Module } from './models'; 

export class Position {

    constructor() {
        this._id = "";
        this.positionName = "";
        this.modules = [new Module()];
    }

    _id: string;
    positionName: string;
    modules: Module[];
}