// 导演
import {DataStore} from "./base/DataStore.js";
import {Black} from "./runtime/Black.js";
import {White} from "./runtime/White.js";
import {Sprite} from "./base/Sprite.js";

export class Director {

// 单例对象
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        console.log("导演构造器初始化~");

        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 1;
        this.isGameOver = true;


    }

    run() {
        if (!this.check()) {
            this.isGameOver = true;

        }
        if (this.isGameOver == false) {
            const boards = this.dataStore.get("boards");
            if (boards[0].y >= DataStore.getInstance().canvas.height) {
                boards.shift();
                boards.shift();
                boards.shift();
                boards.shift();
            }

            if (boards[boards.length - 4].y >= 0) {
                this.createBoard();
            }

            this.dataStore.get("boards").forEach((value, index, array) => {
                value.draw();
            })

            this.dataStore.get('score').draw();

            const timer = requestAnimationFrame(() => {
                this.run();
            })
            this.dataStore.put("timer", timer);
        } else {
            //
            console.log("输了，游戏结束！");
            this.dataStore.ctx.clearRect(0, 0, this.dataStore.canvas.width, this.dataStore.canvas.height);
            this.dataStore.get('start').draw();
            this.dataStore.ctx.font = '28px Arial';
            this.dataStore.ctx.fillStyle = 'red';
            this.dataStore.ctx.fillText(
                "",
                DataStore.getInstance().canvas.width / 4,
                DataStore.getInstance().canvas.height / 3,
            )
            this.dataStore.get('score').draw();

            cancelAnimationFrame(this.dataStore.get("timer"));
            this.dataStore.destory();
        }
    }

    doStep(e) {
        const x = e.x;
        const y = e.y;
        const boards = this.dataStore.get("boards");

        for (let index = 0; index < boards.length; index++) {
            const value = boards[index];
            const left = value.x;
            const top = value.y - value.srcH;
            const right = value.x + value.srcW;
            const bottom = value.y + value.srcH;
            if (value.type == "black") {
                if (x > left && x < right && y > top && y < bottom) {
                    this.dataStore.get('score').scoreNumber++;
                    value.img = Sprite.getImage('white');
                    value.type = "white";
                    this.dataStore.get("boards")[index] = value;
                    break;
                }
            }
            // else if (value.type == "white") {
            //     if (x > left && x < right && y > top && y < bottom) {
            //     }
            // }
        }
        // boards.forEach((value, index, array) => {
        //         const left = value.x;
        //         const top = value.y - value.srcH;
        //         const right = value.x + value.srcW;
        //         const bottom = value.y + value.srcH;
        //         if (value.type == "black") {
        //             if (x > left && x < right && y > top && y < bottom) {
        //                 this.dataStore.get('score').scoreNumber++;
        //
        //                 value.img = Sprite.getImage('white');
        //                 value.type = "white";
        //                 this.dataStore.get("boards")[index] = value;
        //             }
        //         } else if (value.type == "white") {
        //             if (x > left && x < right && y > top && y < bottom) {
        //             }
        //         }
        //     }
        // )
    }

    //黑块超过底部
    check() {
        const boards = this.dataStore.get("boards");
        let flag = true;
        for (let i = 0; i < 4; i++) {
            const board = boards[i];
            if (board.y >= DataStore.getInstance().canvas.height) {
                if (board.type == 'black') {
                    flag = false;
                }
            }
        }
        return flag;
    }

    createBoard() {
        const number = this.randomNum(1, 4);
        switch (number) {
            case 1:
                this.dataStore.get("boards").push(new Black(number));
                this.dataStore.get("boards").push(new White(2));
                this.dataStore.get("boards").push(new White(3));
                this.dataStore.get("boards").push(new White(4));
                break;
            case 2:
                this.dataStore.get("boards").push(new White(1));
                this.dataStore.get("boards").push(new Black(number));
                this.dataStore.get("boards").push(new White(3));
                this.dataStore.get("boards").push(new White(4));
                break;
            case 3:
                this.dataStore.get("boards").push(new White(1));
                this.dataStore.get("boards").push(new White(2));
                this.dataStore.get("boards").push(new Black(number));
                this.dataStore.get("boards").push(new White(4));
                break;
            case 4:
                this.dataStore.get("boards").push(new White(1));
                this.dataStore.get("boards").push(new White(2));
                this.dataStore.get("boards").push(new White(3));
                this.dataStore.get("boards").push(new Black(number));
                break;
        }


    }

    randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }
}