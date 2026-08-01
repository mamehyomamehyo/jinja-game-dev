/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/MessageBox.js
 * メッセージボックスUIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class MessageBox {

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         */
        constructor(
            x,
            y,
            width,
            height
        ) {

            this.panel = new Panel(
                x,
                y,
                width,
                height,
                {
                    background: "#ffffff",
                    border: "#555555",
                    borderWidth: 2
                }
            );

            this.visible = true;

            this.title = "";
            this.message = "";

            this.padding = 16;
            this.lineHeight = 28;

            this.showIndicator = true;

            this.colors = {
                title: "#222222",
                message: "#333333",
                indicator: "#666666"
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

            this.panel.render(renderer);

            const x = this.panel.x + this.padding;
            const y = this.panel.y + this.padding;

            if (this.title) {

                renderer.text(
                    this.title,
                    x,
                    y + 10,
                    {
                        size: 22,
                        color: this.colors.title
                    }
                );
            }

            const startY =
                this.title
                    ? y + 42
                    : y + 10;

            const lines = this.wrapText(this.message);

            lines.forEach((line, index) => {

                renderer.text(
                    line,
                    x,
                    startY + index * this.lineHeight,
                    {
                        size: 20,
                        color: this.colors.message
                    }
                );
            });

            if (this.showIndicator) {

                renderer.text(
                    "▶",
                    this.panel.x + this.panel.width - 24,
                    this.panel.y + this.panel.height - 12,
                    {
                        align: "right",
                        size: 18,
                        color: this.colors.indicator
                    }
                );
            }
        }

        /**
         * テキスト折り返し
         * （簡易実装）
         * @param {string} text
         */
        wrapText(text) {

            if (!text) {
                return [];
            }

            return String(text).split("\n");
        }

        /**
         * タイトル設定
         */
        setTitle(title) {

            this.title = String(title);
        }

        /**
         * メッセージ設定
         */
        setMessage(message) {

            this.message = String(message);
        }

        /**
         * 追記
         */
        append(text) {

            this.message += String(text);
        }

        /**
         * クリア
         */
        clear() {

            this.title = "";
            this.message = "";
        }

        /**
         * インジケーター表示
         */
        setIndicator(visible) {

            this.showIndicator = visible;
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
         * 表示中
         */
        isVisible() {

            return this.visible;
        }

    }

    window.MessageBox = MessageBox;

})();