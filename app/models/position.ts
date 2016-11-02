
import { Module } from './model'; 

export class Position {

    _id: string;
    positionName: string;
    modules: Module[];

    constructor() {

        this._id = "";
        this.positionName = "";
        this.modules = [new Module()];

    }


}