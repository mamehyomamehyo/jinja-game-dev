/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/GameContext.js
 * ゲーム共通コンテキスト
 * ==========================================================
 */

(() => {
    "use strict";

    class GameContext {

        constructor() {

            this.clear();
        }

        /**
         * 共通データ登録
         * @param {string} key
         * @param {*} value
         */
        set(key, value) {

            this.data.set(key, value);

            return value;
        }

        /**
         * 共通データ取得
         * @param {string} key
         * @param {*} defaultValue
         */
        get(key, defaultValue = null) {

            if (!this.data.has(key)) {
                return defaultValue;
            }

            return this.data.get(key);
        }

        /**
         * 存在確認
         * @param {string} key
         */
        has(key) {

            return this.data.has(key);
        }

        /**
         * 削除
         * @param {string} key
         */
        remove(key) {

            return this.data.delete(key);
        }

        /**
         * 全キー取得
         */
        keys() {

            return Array.from(this.data.keys());
        }

        /**
         * 全値取得
         */
        values() {

            return Array.from(this.data.values());
        }

        /**
         * オブジェクト化
         */
        toObject() {

            const object = {};

            for (const [key, value] of this.data) {
                object[key] = value;
            }

            return object;
        }

        /**
         * 全削除
         */
        clear() {

            this.data = new Map();
        }

        /**
         * マネージャ登録
         */
        registerManagers(managers) {

            for (const [key, value] of Object.entries(managers)) {
                this.set(key, value);
            }
        }

        /**
         * マネージャ取得
         */
        getManager(name) {

            return this.get(name);
        }

    }

    window.GameContext = GameContext;

})();