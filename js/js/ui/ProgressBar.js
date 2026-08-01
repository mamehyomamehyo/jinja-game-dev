/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/ProgressBar.js
 * プログレスバーUIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class ProgressBar {

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} maxValue
         */
        constructor(
            x,
            y,
            width,
            height,
            maxValue = 100
        ) {

            this.x = x;
            this.y = y;

            this.width = width;
            this.height = height;

            this.value = 0;
            this.maxValue = Math.max(1, maxValue);

            this.visible = true;
            this.showText = true;

            this.colors = {
                background: "#d9d9d9",
                fill: "#4caf50",
                border: "#666666",
                text: "#222222"
            };
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {
            // v1.0では処理なし
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (!this.visible) {
                return;
            }

            const ratio = Utils.clamp(
                this.value / this.maxValue,
                0,
                1
            );

            renderer.rect(
                this.x,
                this.y,
                this.width,
                this.height,
                this.colors.background
            );

            renderer.rect(
                this.x,
                this.y,
                this.width * ratio,
                this.height,
                this.colors.fill
            );

            renderer.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height,
                this.colors.border,
                2
            );

            if (this.showText) {

                renderer.text(
                    `${this.value} / ${this.maxValue}`,
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    {
                        align: "center",
                        baseline: "middle",
                        size: 18,
                        color: this.colors.text
                    }
                );
            }
        }

        /**
         * 値設定
         * @param {number} value
         */
        setValue(value) {

            this.value = Utils.clamp(
                value,
                0,
                this.maxValue
            );
        }

        /**
         * 最大値設定
         * @param {number} maxValue
         */
        setMaxValue(maxValue) {

            this.maxValue = Math.max(1, maxValue);

            this.value = Utils.clamp(
                this.value,
                0,
                this.maxValue
            );
        }

        /**
         * 現在値取得
         */
        getValue() {

            return this.value;
        }

        /**
         * 最大値取得
         */
        getMaxValue() {

            return this.maxValue;
        }

        /**
         * パーセント取得
         */
        getPercent() {

            return Math.floor(
                (this.value / this.maxValue) * 100
            );
        }

        /**
         * バー色設定
         * @param {string} color
         */
        setFillColor(color) {

            this.colors.fill = color;
        }

        /**
         * 表示テキスト切替
         * @param {boolean} visible
         */
        setShowText(visible) {

            this.showText = visible;
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

    }

    window.ProgressBar = ProgressBar;

})();