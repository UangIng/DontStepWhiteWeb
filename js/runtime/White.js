import {Board} from "./Board.js";
import {Sprite} from "../base/Sprite.js";


export class White extends Board {

    constructor(column) {
        const image = Sprite.getImage('white');
        // const image = Sprite.getImage('green');
        super(image, column, "white");
    }

}