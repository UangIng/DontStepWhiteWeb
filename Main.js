import {
    Director
} from './js/Director.js'
import {
    ResourceLoader
} from './js/base/ResourceLoader.js';
import {
    DataStore
} from './js/base/DataStore.js'

//精灵
import {
    Start
} from './js/player/Start.js'
import {Score} from "./js/player/Score.js";


/**
 * 游戏主函数
 */
export class Main {
    constructor() {
        // this.canvas = wx.createCanvas();
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.director = Director.getInstance();
        this.dataStore = DataStore.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map =>
            this.onResourceFirstLoaded(map)
        )


    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init(isGameOver = true) {
        this.dataStore.ctx.clearRect(0, 0, this.dataStore.canvas.width, this.dataStore.canvas.height);
        if(this.director.isGameOver = isGameOver);
        this.dataStore
            .put('start', Start)
            .put('boards', [])
            .put('score',Score);

        this.director.createBoard();
        this.registerEvent();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener("click", e => {
            //    屏蔽掉JS事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init(false);
            } else {
                this.director.doStep(e);
            }
        })
    }
}