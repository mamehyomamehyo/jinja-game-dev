/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/renderer.js
 * 描画ユーティリティ
 * ==========================================================
 */

(() => {
    "use strict";

    class Renderer {

        constructor(ctx) {
            this.ctx = ctx;
        }

        /**
         * 画面クリア
         */
        clear(color = null) {

            const canvas = this.ctx.canvas;

            this.ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (color) {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }

        /**
         * 矩形
         */
        rect(x, y, width, height, color = "#ffffff") {

            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, width, height);
        }

        /**
         * 枠付き矩形
         */
        strokeRect(
            x,
            y,
            width,
            height,
            color = "#ffffff",
            lineWidth = 1
        ) {

            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeRect(x, y, width, height);
        }

        /**
         * 円
         */
        circle(x, y, radius, color = "#ffffff") {

            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }

        /**
         * 線
         */
        line(
            x1,
            y1,
            x2,
            y2,
            color = "#ffffff",
            width = 1
        ) {

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);

            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = width;
            this.ctx.stroke();
        }

        /**
         * テキスト
         */
        text(
            text,
            x,
            y,
            options = {}
        ) {

            const {
                size = 24,
                color = "#ffffff",
                align = "left",
                baseline = "alphabetic",
                font = "sans-serif"
            } = options;

            this.ctx.fillStyle = color;
            this.ctx.font = `${size}px ${font}`;
            this.ctx.textAlign = align;
            this.ctx.textBaseline = baseline;
            this.ctx.fillText(text, x, y);
        }

        /**
         * 画像
         */
        image(image, x, y, width = null, height = null) {

            if (!image) {
                return;
            }

            if (width === null || height === null) {

                this.ctx.drawImage(image, x, y);

            } else {

                this.ctx.drawImage(
                    image,
                    x,
                    y,
                    width,
                    height
                );
            }
        }

        /**
         * スプライト描画
         */
        sprite(
            image,
            sx,
            sy,
            sw,
            sh,
            dx,
            dy,
            dw = sw,
            dh = sh
        ) {

            if (!image) {
                return;
            }

            this.ctx.drawImage(
                image,
                sx,
                sy,
                sw,
                sh,
                dx,
                dy,
                dw,
                dh
            );
        }

        /**
         * 保存
         */
        save() {
            this.ctx.save();
        }

        /**
         * 復元
         */
        restore() {
            this.ctx.restore();
        }

        /**
         * 透明度
         */
        alpha(value) {
            this.ctx.globalAlpha = value;
        }

        /**
         * 回転
         */
        rotate(rad) {
            this.ctx.rotate(rad);
        }

        /**
         * 移動
         */
        translate(x, y) {
            this.ctx.translate(x, y);
        }

        /**
         * 拡大縮小
         */
        scale(x, y) {
            this.ctx.scale(x, y);
        }

    }

    window.Renderer = Renderer;

})();