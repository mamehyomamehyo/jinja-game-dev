/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/entity.js
 * エンティティ基底クラス
 * ==========================================================
 */

(() => {
    "use strict";

    class Entity {

        constructor(x = 0, y = 0) {

            this.x = x;
            this.y = y;

            this.width = 0;
            this.height = 0;

            this.vx = 0;
            this.vy = 0;

            this.rotation = 0;
            this.scaleX = 1;
            this.scaleY = 1;

            this.visible = true;
            this.active = true;

            this.alpha = 1;

            this.tag = "";
            this.layer = 0;

            this.parent = null;
        }

        /**
         * 更新
         */
        update(delta) {

        }

        /**
         * 描画
         */
        render(renderer) {

        }

        /**
         * 座標設定
         */
        setPosition(x, y) {

            this.x = x;
            this.y = y;

            return this;
        }

        /**
         * サイズ設定
         */
        setSize(width, height) {

            this.width = width;
            this.height = height;

            return this;
        }

        /**
         * 速度設定
         */
        setVelocity(vx, vy) {

            this.vx = vx;
            this.vy = vy;

            return this;
        }

        /**
         * 移動
         */
        move(delta) {

            this.x += this.vx * delta;
            this.y += this.vy * delta;
        }

        /**
         * 表示
         */
        show() {

            this.visible = true;

            return this;
        }

        /**
         * 非表示
         */
        hide() {

            this.visible = false;

            return this;
        }

        /**
         * 有効化
         */
        enable() {

            this.active = true;

            return this;
        }

        /**
         * 無効化
         */
        disable() {

            this.active = false;

            return this;
        }

        /**
         * 矩形取得
         */
        getBounds() {

            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        }

        /**
         * 当たり判定
         */
        intersects(entity) {

            return (
                this.x < entity.x + entity.width &&
                this.x + this.width > entity.x &&
                this.y < entity.y + entity.height &&
                this.y + this.height > entity.y
            );
        }

        /**
         * 点との判定
         */
        containsPoint(x, y) {

            return (
                x >= this.x &&
                x <= this.x + this.width &&
                y >= this.y &&
                y <= this.y + this.height
            );
        }

        /**
         * 距離
         */
        distanceTo(entity) {

            return Math.hypot(
                entity.x - this.x,
                entity.y - this.y
            );
        }

    }

    window.Entity = Entity;

})();