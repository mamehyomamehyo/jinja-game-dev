/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/NotificationView.js
 * 通知表示UIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class NotificationView {

        /**
         * @param {NotificationManager} notificationManager
         * @param {Object} options
         */
        constructor(notificationManager, options = {}) {

            this.manager = notificationManager;

            this.x = options.x ?? 20;
            this.y = options.y ?? 20;
            this.width = options.width ?? (CONFIG.GAME_WIDTH - 40);
            this.height = options.height ?? 56;

            this.visible = true;

            this.colors = {
                info: "#2196f3",
                success: "#43a047",
                warning: "#fb8c00",
                error: "#e53935",
                text: "#ffffff",
                border: "#ffffff"
            };
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (!this.visible) {
                return;
            }

            this.manager.update(delta);
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (!this.visible) {
                return;
            }

            const notification = this.manager.getCurrent();

            if (!notification) {
                return;
            }

            const color =
                this.colors[notification.type] ??
                this.colors.info;

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
                notification.message,
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
         * 表示切替
         */
        toggle() {

            this.visible = !this.visible;
        }

        /**
         * 表示位置変更
         */
        setPosition(x, y) {

            this.x = x;
            this.y = y;
        }

        /**
         * サイズ変更
         */
        setSize(width, height) {

            this.width = width;
            this.height = height;
        }

        /**
         * 通知中判定
         */
        isShowing() {

            return this.manager.isShowing();
        }

    }

    window.NotificationView = NotificationView;

})();