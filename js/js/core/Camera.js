/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/Camera.js
 * カメラ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class Camera {

        /**
         * @param {number} width
         * @param {number} height
         */
        constructor(width = CONFIG.GAME_WIDTH, height = CONFIG.GAME_HEIGHT) {

            this.width = width;
            this.height = height;

            this.x = 0;
            this.y = 0;

            this.zoom = 1.0;
            this.rotation = 0;

            this.target = null;

            this.offsetX = 0;
            this.offsetY = 0;

            this.smooth = 0.15;

            this.bounds = {
                left: -Infinity,
                top: -Infinity,
                right: Infinity,
                bottom: Infinity
            };
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (!this.target) {
                return;
            }

            const targetX =
                this.target.x -
                this.width / (2 * this.zoom) +
                this.offsetX;

            const targetY =
                this.target.y -
                this.height / (2 * this.zoom) +
                this.offsetY;

            this.x += (targetX - this.x) * this.smooth;
            this.y += (targetY - this.y) * this.smooth;

            this.clamp();
        }

        /**
         * ターゲット設定
         * @param {Object|null} target
         */
        follow(target) {

            this.target = target;
        }

        /**
         * 位置設定
         */
        setPosition(x, y) {

            this.x = x;
            this.y = y;

            this.clamp();
        }

        /**
         * 移動
         */
        move(dx, dy) {

            this.x += dx;
            this.y += dy;

            this.clamp();
        }

        /**
         * ズーム設定
         */
        setZoom(value) {

            this.zoom = Math.max(0.1, value);
        }

        /**
         * 回転設定
         */
        setRotation(angle) {

            this.rotation = angle;
        }

        /**
         * オフセット設定
         */
        setOffset(x, y) {

            this.offsetX = x;
            this.offsetY = y;
        }

        /**
         * 移動範囲設定
         */
        setBounds(left, top, right, bottom) {

            this.bounds.left = left;
            this.bounds.top = top;
            this.bounds.right = right;
            this.bounds.bottom = bottom;

            this.clamp();
        }

        /**
         * 範囲制限
         */
        clamp() {

            this.x = Math.max(
                this.bounds.left,
                Math.min(this.x, this.bounds.right)
            );

            this.y = Math.max(
                this.bounds.top,
                Math.min(this.y, this.bounds.bottom)
            );
        }

        /**
         * ワールド座標→画面座標
         */
        worldToScreen(x, y) {

            return {
                x: (x - this.x) * this.zoom,
                y: (y - this.y) * this.zoom
            };
        }

        /**
         * 画面座標→ワールド座標
         */
        screenToWorld(x, y) {

            return {
                x: x / this.zoom + this.x,
                y: y / this.zoom + this.y
            };
        }

        /**
         * カメラ適用
         * @param {CanvasRenderingContext2D} context
         */
        apply(context) {

            context.save();

            context.scale(this.zoom, this.zoom);

            context.rotate(this.rotation);

            context.translate(
                -this.x,
                -this.y
            );
        }

        /**
         * カメラ解除
         * @param {CanvasRenderingContext2D} context
         */
        restore(context) {

            context.restore();
        }

        /**
         * リセット
         */
        reset() {

            this.x = 0;
            this.y = 0;

            this.zoom = 1;
            this.rotation = 0;

            this.offsetX = 0;
            this.offsetY = 0;

            this.target = null;
        }

    }

    window.Camera = Camera;

})();