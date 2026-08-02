/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/Transition.js
 * シーン遷移エフェクト
 * ==========================================================
 */

(() => {
    "use strict";

    class Transition {

        constructor() {

            this.active = false;

            this.type = "fade";

            this.duration = 1.0;
            this.elapsed = 0;

            this.direction = "in";

            this.color = "#000000";

            this.alpha = 0;

            this.onComplete = null;
        }

        /**
         * フェードイン開始
         * @param {number} duration
         * @param {Function|null} callback
         */
        fadeIn(duration = 1.0, callback = null) {

            this.start(
                "fade",
                "in",
                duration,
                callback
            );
        }

        /**
         * フェードアウト開始
         * @param {number} duration
         * @param {Function|null} callback
         */
        fadeOut(duration = 1.0, callback = null) {

            this.start(
                "fade",
                "out",
                duration,
                callback
            );
        }

        /**
         * 遷移開始
         */
        start(type, direction, duration, callback) {

            this.type = type;

            this.direction = direction;

            this.duration = Math.max(
                0.001,
                duration
            );

            this.elapsed = 0;

            this.alpha =
                direction === "in"
                    ? 1
                    : 0;

            this.onComplete = callback;

            this.active = true;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (!this.active) {
                return;
            }

            this.elapsed += delta;

            const progress = Math.min(
                this.elapsed / this.duration,
                1
            );

            switch (this.direction) {

                case "in":

                    this.alpha = 1 - progress;

                    break;

                case "out":

                    this.alpha = progress;

                    break;
            }

            if (progress >= 1) {

                this.active = false;

                if (typeof this.onComplete === "function") {

                    this.onComplete();
                }
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (!this.active) {
                return;
            }

            renderer.save();

            renderer.alpha(this.alpha);

            renderer.rect(
                0,
                0,
                CONFIG.GAME_WIDTH,
                CONFIG.GAME_HEIGHT,
                this.color
            );

            renderer.restore();
        }

        /**
         * 色変更
         * @param {string} color
         */
        setColor(color) {

            this.color = color;
        }

        /**
         * 実行中判定
         */
        isActive() {

            return this.active;
        }

        /**
         * 中断
         */
        stop() {

            this.active = false;
        }

        /**
         * リセット
         */
        reset() {

            this.active = false;

            this.elapsed = 0;

            this.alpha = 0;

            this.direction = "in";

            this.type = "fade";

            this.onComplete = null;
        }

    }

    window.Transition = Transition;

})();