/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/Button.js
 * ボタンUIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class Button {

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {string} text
         * @param {Function|null} onClick
         */
        constructor(
            x,
            y,
            width,
            height,
            text,
            onClick = null
        ) {

            this.x = x;
            this.y = y;

            this.width = width;
            this.height = height;

            this.text = text;

            this.onClick = onClick;

            this.visible = true;
            this.enabled = true;

            this.hover = false;

            this.colors = {
                normal: "#f3f3f3",
                hover: "#dcefd4",
                disabled: "#cccccc",
                border: "#666666",
                text: "#222222"
            };
        }

        /**
         * 更新
         * @param {Input} input
         */
        update(input) {

            if (!this.visible || !this.enabled) {
                return;
            }

            const mouse = input.getMousePosition();

            this.hover = this.contains(
                mouse.x,
                mouse.y
            );

            if (
                this.hover &&
                input.isMousePressed()
            ) {
                if (typeof this.onClick === "function") {
                    this.onClick(this);
                }
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (!this.visible) {
                return;
            }

            let color = this.colors.normal;

            if (!this.enabled) {
                color = this.colors.disabled;
            } else if (this.hover) {
                color = this.colors.hover;
            }

            renderer.rect(
                this.x,
                this.y,
                this.width,
                this.height,
                color
            );

            renderer.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height,
                this.colors.border,
                2
            );

            renderer.text(
                this.text,
                this.x + this.width / 2,
                this.y + this.height / 2,
                {
                    align: "center",
                    baseline: "middle",
                    size: 20,
                    color: this.colors.text
                }
            );
        }

        /**
         * 当たり判定
         */
        contains(x, y) {

            return (
                x >= this.x &&
                x <= this.x + this.width &&
                y >= this.y &&
                y <= this.y + this.height
            );
        }

        /**
         * 表示
         */
        show() {

            this.visible = true;
        }

        /**
         * 非表示
         */
        hide() {

            this.visible = false;
        }

        /**
         * 有効
         */
        enable() {

            this.enabled = true;
        }

        /**
         * 無効
         */
        disable() {

            this.enabled = false;
        }

        /**
         * テキスト変更
         */
        setText(text) {

            this.text = text;
        }

        /**
         * クリックイベント変更
         */
        setOnClick(callback) {

            this.onClick = callback;
        }

    }

    window.Button = Button;

})();