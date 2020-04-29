import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";
import {DataStore} from "../base/DataStore.js";


export class Board extends Sprite {

    constructor(image, column = 1, type) {
        super(
            image,
            0,
            0,
            image.width,
            image.height,
            //    刚好再上侧看不到的位置
            (column - 1) * DataStore.getInstance().canvas.width / 4,
            -image.height,
            DataStore.getInstance().canvas.width / 4,
            image.height
        );
        this.colum = column;
        this.type = type;
        this.moveSpeed = Director.getInstance().moveSpeed;
    }

    draw() {
        this.y = this.y + this.moveSpeed + DataStore.getInstance().get('score').scoreNumber/10;
        super.draw(
            this.img,
            0,
            0,
            this.img.width,
            this.img.height,
            (this.colum - 1) * DataStore.getInstance().canvas.width / 4,
            this.y,
            DataStore.getInstance().canvas.width / 4,
            this.img.height
        )

    }

}