
import { Module } from './model'; 

export class Position {

    _id: string;
    positionName: string;
    modules: Module[];

    constructor() {

        this.positionName = "";
        this.modules = [new Module()];

    }


}