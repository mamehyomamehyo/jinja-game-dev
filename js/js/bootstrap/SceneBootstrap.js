/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/bootstrap/SceneBootstrap.js
 * シーン初期化
 * ==========================================================
 */

(() => {
    "use strict";

    class SceneBootstrap {

        /**
         * シーン初期化
         * @param {App} app
         */
        static initialize(app) {

            if (!app) {

                throw new Error(
                    "SceneBootstrap: App が指定されていません。"
                );
            }

            const sceneManager =
                app.game.getSceneManager();

            /*
             * ==================================================
             * シーン登録
             * ==================================================
             */

            this.register(
                sceneManager,
                "boot",
                BootScene,
                app.game
            );

            this.register(
                sceneManager,
                "title",
                TitleScene,
                app.game
            );

            this.register(
                sceneManager,
                "main",
                MainScene,
                app.game
            );

            this.register(
                sceneManager,
                "map",
                MapScene,
                app.game
            );

            this.register(
                sceneManager,
                "shrine",
                ShrineScene,
                app.game
            );

            this.register(
                sceneManager,
                "fortune",
                FortuneScene,
                app.game
            );

            this.register(
                sceneManager,
                "shop",
                ShopScene,
                app.game
            );

            this.register(
                sceneManager,
                "inventory",
                InventoryScene,
                app.game
            );

            /*
             * ==================================================
             * 開始シーン
             * ==================================================
             */

            sceneManager.change("boot");
        }

        /**
         * シーン登録
         * @param {SceneManager} sceneManager
         * @param {string} key
         * @param {Function} SceneClass
         * @param {Game} game
         */
        static register(
            sceneManager,
            key,
            SceneClass,
            game
        ) {

            if (
                typeof SceneClass === "undefined"
            ) {

                console.warn(
                    `SceneBootstrap: ${key} は未定義です。`
                );

                return;
            }

            sceneManager.add(
                key,
                new SceneClass(game)
            );
        }

        /**
         * シーン取得
         * @param {App} app
         * @param {string} name
         */
        static get(app, name) {

            return app
                .game
                .getSceneManager()
                .get(name);
        }

        /**
         * シーン変更
         * @param {App} app
         * @param {string} name
         */
        static change(app, name) {

            app
                .game
                .getSceneManager()
                .change(name);
        }

    }

    window.SceneBootstrap =
        SceneBootstrap;

})();