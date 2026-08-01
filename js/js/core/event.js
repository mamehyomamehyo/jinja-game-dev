/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/event.js
 * イベント管理
 * ==========================================================
 */

(() => {
    "use strict";

    class EventManager {

        constructor() {

            this.events = new Map();
        }

        /**
         * イベント登録
         * @param {string} name
         * @param {Function} listener
         */
        on(name, listener) {

            if (!this.events.has(name)) {
                this.events.set(name, []);
            }

            this.events.get(name).push(listener);

            return this;
        }

        /**
         * 一度だけ実行
         * @param {string} name
         * @param {Function} listener
         */
        once(name, listener) {

            const wrapper = (...args) => {

                this.off(name, wrapper);
                listener(...args);
            };

            this.on(name, wrapper);

            return this;
        }

        /**
         * イベント解除
         * @param {string} name
         * @param {Function} listener
         */
        off(name, listener) {

            if (!this.events.has(name)) {
                return this;
            }

            const list = this.events.get(name);

            const index = list.indexOf(listener);

            if (index !== -1) {
                list.splice(index, 1);
            }

            if (list.length === 0) {
                this.events.delete(name);
            }

            return this;
        }

        /**
         * イベント発火
         * @param {string} name
         * @param  {...any} args
         */
        emit(name, ...args) {

            if (!this.events.has(name)) {
                return;
            }

            const listeners = [...this.events.get(name)];

            for (const listener of listeners) {

                try {

                    listener(...args);

                } catch (error) {

                    console.error(error);
                }
            }
        }

        /**
         * 全イベント削除
         */
        clear() {

            this.events.clear();
        }

        /**
         * 指定イベント削除
         * @param {string} name
         */
        clearEvent(name) {

            this.events.delete(name);
        }

        /**
         * リスナー数取得
         * @param {string} name
         */
        listenerCount(name) {

            if (!this.events.has(name)) {
                return 0;
            }

            return this.events.get(name).length;
        }

        /**
         * イベント存在確認
         * @param {string} name
         */
        has(name) {

            return this.events.has(name);
        }

    }

    window.EventManager = EventManager;

})();