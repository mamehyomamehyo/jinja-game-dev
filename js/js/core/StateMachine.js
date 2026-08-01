/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/StateMachine.js
 * ステートマシン
 * ==========================================================
 */

(() => {
    "use strict";

    class StateMachine {

        /**
         * @param {string|null} initialState
         */
        constructor(initialState = null) {

            this.states = new Map();

            this.currentState = null;
            this.currentName = "";

            if (initialState !== null) {
                this.currentName = initialState;
            }
        }

        /**
         * ステート登録
         * @param {string} name
         * @param {Object} state
         */
        add(name, state) {

            if (!name || !state) {
                return this;
            }

            this.states.set(name, state);

            if (
                this.currentState === null &&
                this.currentName === name
            ) {

                this.currentState = state;

                if (typeof state.enter === "function") {
                    state.enter();
                }
            }

            return this;
        }

        /**
         * ステート変更
         * @param {string} name
         */
        change(name) {

            const next = this.states.get(name);

            if (!next) {

                console.warn(
                    `[StateMachine] State not found: ${name}`
                );

                return false;
            }

            if (
                this.currentState &&
                typeof this.currentState.exit === "function"
            ) {

                this.currentState.exit();
            }

            this.currentState = next;
            this.currentName = name;

            if (typeof next.enter === "function") {
                next.enter();
            }

            return true;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (
                this.currentState &&
                typeof this.currentState.update === "function"
            ) {

                this.currentState.update(delta);
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (
                this.currentState &&
                typeof this.currentState.render === "function"
            ) {

                this.currentState.render(renderer);
            }
        }

        /**
         * 現在ステート取得
         */
        getCurrentState() {

            return this.currentState;
        }

        /**
         * 現在ステート名取得
         */
        getCurrentName() {

            return this.currentName;
        }

        /**
         * ステート存在確認
         * @param {string} name
         */
        has(name) {

            return this.states.has(name);
        }

        /**
         * 全ステート取得
         */
        getStates() {

            return Array.from(this.states.keys());
        }

        /**
         * ステート数
         */
        count() {

            return this.states.size;
        }

        /**
         * 全削除
         */
        clear() {

            if (
                this.currentState &&
                typeof this.currentState.exit === "function"
            ) {

                this.currentState.exit();
            }

            this.states.clear();

            this.currentState = null;
            this.currentName = "";
        }

    }

    window.StateMachine = StateMachine;

})();