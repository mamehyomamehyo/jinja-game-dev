/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/scene.js
 * シーン管理
 * ==========================================================
 */

(() => {
    "use strict";

    class SceneManager {

        constructor() {
            this.scenes = new Map();
            this.current = null;
            this.currentName = "";
            this.nextName = null;
            this.started = false;
        }

        /**
         * シーン登録
         * @param {string} name
         * @param {object} scene
         */
        register(name, scene) {

            if (!name) {
                throw new Error("Scene name is required.");
            }

            this.scenes.set(name, scene);

            return this;
        }

        /**
         * シーン取得
         */
        get(name) {
            return this.scenes.get(name) || null;
        }

        /**
         * シーン存在確認
         */
        has(name) {
            return this.scenes.has(name);
        }

        /**
         * 開始
         */
        start(name) {

            if (!this.has(name)) {
                throw new Error(`Scene "${name}" not found.`);
            }

            this.started = true;
            this.change(name);
        }

        /**
         * シーン変更予約
         */
        change(name) {

            if (!this.has(name)) {
                throw new Error(`Scene "${name}" not found.`);
            }

            this.nextName = name;
        }

        /**
         * 毎フレーム更新
         */
        update(delta) {

            if (!this.started) {
                return;
            }

            if (this.nextName !== null) {
                this.#switchScene(this.nextName);
                this.nextName = null;
            }

            if (this.current && typeof this.current.update === "function") {
                this.current.update(delta);
            }
        }

        /**
         * 描画
         */
        render(ctx) {

            if (!this.current) {
                return;
            }

            if (typeof this.current.render === "function") {
                this.current.render(ctx);
            }
        }

        /**
         * 現在シーン名
         */
        getName() {
            return this.currentName;
        }

        /**
         * 現在シーン
         */
        getCurrent() {
            return this.current;
        }

        /**
         * リセット
         */
        reset() {

            if (this.current && typeof this.current.exit === "function") {
                this.current.exit();
            }

            this.current = null;
            this.currentName = "";
            this.nextName = null;
            this.started = false;
        }

        /**
         * 内部切替
         */
        #switchScene(name) {

            if (this.current && typeof this.current.exit === "function") {
                this.current.exit();
            }

            this.current = this.scenes.get(name);
            this.currentName = name;

            if (this.current && typeof this.current.enter === "function") {
                this.current.enter();
            }
        }
    }

    window.SceneManager = SceneManager;

})();