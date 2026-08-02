/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/bootstrap/Bootstrap.js
 * ブートストラップ
 * ==========================================================
 */

(() => {
    "use strict";

    class Bootstrap {

        /**
         * アプリケーション初期化
         * @param {App} app
         */
        static initialize(app) {

            if (!app) {

                throw new Error(
                    "Bootstrap: App が指定されていません。"
                );
            }

            this.initializeData(app);

            this.initializeManagers(app);

            this.initializeScenes(app);
        }

        /**
         * データ初期化
         * @param {App} app
         */
        static initializeData(app) {

            if (
                typeof DataBootstrap === "undefined"
            ) {

                throw new Error(
                    "DataBootstrap が読み込まれていません。"
                );
            }

            DataBootstrap.initialize(app);
        }

        /**
         * マネージャ初期化
         * @param {App} app
         */
        static initializeManagers(app) {

            if (
                typeof ManagerBootstrap === "undefined"
            ) {

                throw new Error(
                    "ManagerBootstrap が読み込まれていません。"
                );
            }

            ManagerBootstrap.initialize(app);
        }

        /**
         * シーン初期化
         * @param {App} app
         */
        static initializeScenes(app) {

            if (
                typeof SceneBootstrap === "undefined"
            ) {

                throw new Error(
                    "SceneBootstrap が読み込まれていません。"
                );
            }

            SceneBootstrap.initialize(app);
        }

    }

    window.Bootstrap = Bootstrap;

})();