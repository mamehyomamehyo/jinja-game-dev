/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/input.js
 * 入力管理
 * ==========================================================
 */

(() => {
    "use strict";

    class Input {

        constructor(target = window) {

            this.target = target;

            this.keys = {};
            this.pressed = {};
            this.released = {};

            this.mouse = {
                x: 0,
                y: 0,
                down: false,
                pressed: false,
                released: false
            };

            this.#bind();
        }

        #bind() {

            window.addEventListener("keydown", (e) => {

                if (!this.keys[e.code]) {
                    this.pressed[e.code] = true;
                }

                this.keys[e.code] = true;
            });

            window.addEventListener("keyup", (e) => {

                this.keys[e.code] = false;
                this.released[e.code] = true;
            });

            this.target.addEventListener("mousemove", (e) => {

                const rect = this.target.getBoundingClientRect();

                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.target.addEventListener("mousedown", () => {

                if (!this.mouse.down) {
                    this.mouse.pressed = true;
                }

                this.mouse.down = true;
            });

            window.addEventListener("mouseup", () => {

                this.mouse.down = false;
                this.mouse.released = true;
            });

            this.target.addEventListener("touchstart", (e) => {

                const touch = e.touches[0];
                const rect = this.target.getBoundingClientRect();

                this.mouse.x = touch.clientX - rect.left;
                this.mouse.y = touch.clientY - rect.top;

                if (!this.mouse.down) {
                    this.mouse.pressed = true;
                }

                this.mouse.down = true;

                e.preventDefault();

            }, { passive: false });

            this.target.addEventListener("touchmove", (e) => {

                const touch = e.touches[0];
                const rect = this.target.getBoundingClientRect();

                this.mouse.x = touch.clientX - rect.left;
                this.mouse.y = touch.clientY - rect.top;

                e.preventDefault();

            }, { passive: false });

            window.addEventListener("touchend", () => {

                this.mouse.down = false;
                this.mouse.released = true;

            }, { passive: false });
        }

        /**
         * フレーム終了時に呼ぶ
         */
        update() {

            this.pressed = {};
            this.released = {};

            this.mouse.pressed = false;
            this.mouse.released = false;
        }

        /**
         * キー押下中
         */
        isDown(code) {
            return !!this.keys[code];
        }

        /**
         * キー押した瞬間
         */
        isPressed(code) {
            return !!this.pressed[code];
        }

        /**
         * キー離した瞬間
         */
        isReleased(code) {
            return !!this.released[code];
        }

        /**
         * マウス押下中
         */
        isMouseDown() {
            return this.mouse.down;
        }

        /**
         * マウス押した瞬間
         */
        isMousePressed() {
            return this.mouse.pressed;
        }

        /**
         * マウス離した瞬間
         */
        isMouseReleased() {
            return this.mouse.released;
        }

        /**
         * マウス座標
         */
        getMousePosition() {

            return {
                x: this.mouse.x,
                y: this.mouse.y
            };
        }

    }

    window.Input = Input;

})();