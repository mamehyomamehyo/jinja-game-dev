/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/SceneManager.js
 * シーン管理
 * ==========================================================
 */

(() => {
    "use strict";

    class SceneManager {

        /**
         * @param {Game} game
         */
        constructor(game) {

            this.game = game;

            this.scenes = new Map();

            this.currentScene = null;
            this.currentName = "";

            this.nextScene = null;

            this.isChanging = false;
        }

        /**
         * シーン登録
         * @param {string} name
         * @param {Scene} scene
         */
        add(name, scene) {

            if (!name || !scene) {
                return;
            }

            scene.game = this.game;

            this.scenes.set(name, scene);
        }

        /**
         * シーン取得
         * @param {string} name
         */
        get(name) {

            return this.scenes.get(name) || null;
        }

        /**
         * シーン存在確認
         * @param {string} name
         */
        has(name) {

            return this.scenes.has(name);
        }

        /**
         * シーン変更予約
         * @param {string} name
         */
        change(name) {

            if (!this.has(name)) {

                console.warn(
                    `[SceneManager] Scene not found: ${name}`
                );

                return false;
            }

            this.nextScene = name;

            return true;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (this.nextScene !== null) {

                this.performChange();

            }

            if (
                this.currentScene &&
                typeof this.currentScene.update === "function"
            ) {

                this.currentScene.update(delta);
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (
                this.currentScene &&
                typeof this.currentScene.render === "function"
            ) {

                this.currentScene.render(renderer);
            }
        }

        /**
         * シーン切替実行
         */
        performChange() {

            this.isChanging = true;

            if (
                this.currentScene &&
                typeof this.currentScene.exit === "function"
            ) {

                this.currentScene.exit();
            }

            this.currentName = this.nextScene;

            this.currentScene = this.scenes.get(
                this.currentName
            );

            this.nextScene = null;

            if (
                this.currentScene &&
                typeof this.currentScene.enter === "function"
            ) {

                this.currentScene.enter();
            }

            this.isChanging = false;
        }

        /**
         * 現在シーン取得
         */
        getCurrentScene() {

            return this.currentScene;
        }

        /**
         * 現在シーン名取得
         */
        getCurrentName() {

            return this.currentName;
        }

        /**
         * シーン数
         */
        count() {

            return this.scenes.size;
        }

        /**
         * 全削除
         */
        clear() {

            this.scenes.clear();

            this.currentScene = null;
            this.currentName = "";
            this.nextScene = null;
        }

    }

    window.SceneManager = SceneManager;

})();