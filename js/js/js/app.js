/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/app.js
 * アプリケーションエントリーポイント
 * ==========================================================
 */

(() => {
    "use strict";

    class App {

        constructor() {

            /*
             * ==========================================
             * Game生成
             * ==========================================
             */

            this.game = new Game();

            /*
             * ==========================================
             * Bootstrap初期化
             * ==========================================
             */

            Bootstrap.initialize(this);

            /*
             * ==========================================
             * グローバル公開
             * ==========================================
             */

            window.app = this;
        }

        /**
         * 起動
         */
        start() {

            this.game.start();
        }

        /**
         * Game取得
         */
        getGame() {

            return this.game;
        }

        /**
         * Context取得
         */
        getContext() {

            return this.context;
        }

        /**
         * Data取得
         */
        getData(name) {

            if (!this.data) {
                return null;
            }

            return this.data[name] ?? null;
        }

        /**
         * Manager取得
         */
        getManager(name) {

            if (!this.managers) {
                return null;
            }

            return this.managers[name] ?? null;
        }

    }

    window.App = App;

    /*
     * ==============================================
     * 起動
     * ==============================================
     */

    window.addEventListener("load", () => {

        const app = new App();

        app.start();

    });

})();