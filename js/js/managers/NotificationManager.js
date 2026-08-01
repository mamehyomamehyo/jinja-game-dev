/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/NotificationManager.js
 * 通知管理
 * ==========================================================
 */

(() => {
    "use strict";

    class NotificationManager {

        constructor() {

            this.queue = [];
            this.current = null;

            this.defaultDuration = 3.0;
        }

        /**
         * 通知追加
         * @param {string} message
         * @param {string} type
         * @param {number} duration
         */
        push(
            message,
            type = "info",
            duration = this.defaultDuration
        ) {

            this.queue.push({

                message,
                type,
                duration,

                remaining: duration
            });
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (!this.current) {

                if (this.queue.length === 0) {
                    return;
                }

                this.current = this.queue.shift();
            }

            this.current.remaining -= delta;

            if (this.current.remaining <= 0) {

                this.current = null;
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (!this.current) {
                return;
            }

            let color = "#2196f3";

            switch (this.current.type) {

                case "success":
                    color = "#43a047";
                    break;

                case "warning":
                    color = "#fb8c00";
                    break;

                case "error":
                    color = "#e53935";
                    break;
            }

            renderer.rect(
                20,
                20,
                CONFIG.GAME_WIDTH - 40,
                56,
                color
            );

            renderer.text(
                this.current.message,
                CONFIG.GAME_WIDTH / 2,
                55,
                {
                    align: "center",
                    size: 22,
                    color: "#ffffff"
                }
            );
        }

        /**
         * 現在通知
         */
        getCurrent() {

            return this.current;
        }

        /**
         * 通知数
         */
        count() {

            return this.queue.length +
                (this.current ? 1 : 0);
        }

        /**
         * 表示中
         */
        isShowing() {

            return this.current !== null;
        }

        /**
         * スキップ
         */
        skip() {

            this.current = null;
        }

        /**
         * 全削除
         */
        clear() {

            this.queue.length = 0;
            this.current = null;
        }

    }

    window.NotificationManager = NotificationManager;

})();