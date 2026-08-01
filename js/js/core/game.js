/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/game.js
 * ゲーム本体
 * ==========================================================
 */

(() => {
    "use strict";

    class Game {

        constructor() {

            this.canvas = document.getElementById(CONFIG.CANVAS_ID);

            if (!this.canvas) {
                throw new Error(`Canvas "${CONFIG.CANVAS_ID}" not found.`);
            }

            this.ctx = this.canvas.getContext("2d");

            this.scene = new SceneManager();

            this.running = false;
            this.lastTime = 0;
            this.delta = 0;

            this.fps = CONFIG.FPS || 60;
            this.frameTime = 1000 / this.fps;

            this.accumulator = 0;

            this.resize();

            window.addEventListener("resize", () => this.resize());
        }

        /**
         * Canvasサイズ設定
         */
        resize() {

            this.canvas.width = CONFIG.GAME_WIDTH;
            this.canvas.height = CONFIG.GAME_HEIGHT;
        }

        /**
         * シーン登録
         */
        addScene(name, scene) {

            this.scene.register(name, scene);

            return this;
        }

        /**
         * ゲーム開始
         */
        start(firstScene) {

            if (this.running) {
                return;
            }

            this.scene.start(firstScene);

            this.running = true;
            this.lastTime = performance.now();

            requestAnimationFrame(this.loop.bind(this));
        }

        /**
         * 停止
         */
        stop() {
            this.running = false;
        }

        /**
         * メインループ
         */
        loop(now) {

            if (!this.running) {
                return;
            }

            this.delta = now - this.lastTime;
            this.lastTime = now;

            this.accumulator += this.delta;

            while (this.accumulator >= this.frameTime) {

                this.update(this.frameTime / 1000);

                this.accumulator -= this.frameTime;
            }

            this.render();

            requestAnimationFrame(this.loop.bind(this));
        }

        /**
         * 更新
         */
        update(delta) {

            this.scene.update(delta);
        }

        /**
         * 描画
         */
        render() {

            this.clear();

            this.scene.render(this.ctx);
        }

        /**
         * 画面クリア
         */
        clear() {

            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        }

        /**
         * SceneManager取得
         */
        getSceneManager() {
            return this.scene;
        }

        /**
         * Context取得
         */
        getContext() {
            return this.ctx;
        }

        /**
         * Canvas取得
         */
        getCanvas() {
            return this.canvas;
        }

    }

    window.Game = Game;

})();