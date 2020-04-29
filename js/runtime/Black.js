import {Board} from "./Board.js";
import {Sprite} from "../base/Sprite.js";

export class Black extends Board {

    constructor(column) {
        // const number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        // let image
        // const image_chendi = Sprite.getImage("chendi");
        // const image_mengyun = Sprite.getImage("mengyun");
        // const image_xiaodong = Sprite.getImage("xiaodong");
        // switch (number) {
        //     case 1:
        //         image = image_chendi;
        //         break;
        //     case 2:
        //         image = image_mengyun;
        //         break;
        //     case 3:
        //         image = image_xiaodong;
        //         break;
        // }
        const image = Sprite.getImage("black");
        // image.border = 3;
        // image.borderColor = "#7FEC65";
        // image.borderStyle = "solid";
        // console.log(image.border);
        super(image, column, "black");
    }


}