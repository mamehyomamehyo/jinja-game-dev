/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/Window.js
 * ウィンドウUIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class Window {

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {Object} options
         */
        constructor(
            x,
            y,
            width,
            height,
            options = {}
        ) {

            this.panel = new Panel(
                x,
                y,
                width,
                height,
                {
                    background: options.background ?? "#ffffff",
                    border: options.border ?? "#444444",
                    borderWidth: options.borderWidth ?? 2
                }
            );

            this.visible = true;

            this.title = options.title ?? "";

            this.padding = options.padding ?? 12;
            this.titleHeight = options.titleHeight ?? 40;

            this.children = [];
        }

        /**
         * 子要素追加
         * @param {Object} child
         */
        add(child) {

            if (!child) {
                return;
            }

            this.children.push(child);

            return child;
        }

        /**
         * 子要素削除
         * @param {Object} child
         */
        remove(child) {

            const index = this.children.indexOf(child);

            if (index !== -1) {
                this.children.splice(index, 1);
            }
        }

        /**
         * 子要素全削除
         */
        clear() {

            this.children.length = 0;
        }

        /**
         * 更新
         * @param {number} delta
         * @param {Input} input
         */
        update(delta, input) {

            if (!this.visible) {
                return;
            }

            for (const child of this.children) {

                if (
                    child &&
                    typeof child.update === "function"
                ) {
                    child.update(delta, input);
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

            this.panel.render(renderer);

            if (this.title) {

                renderer.text(
                    this.title,
                    this.panel.x + this.padding,
                    this.panel.y + 28,
                    {
                        size: 24,
                        color: "#222222"
                    }
                );

                renderer.strokeRect(
                    this.panel.x,
                    this.panel.y,
                    this.panel.width,
                    this.titleHeight,
                    "#777777",
                    1
                );
            }

            for (const child of this.children) {

                if (
                    child &&
                    typeof child.render === "function"
                ) {
                    child.render(renderer);
                }
            }
        }

        /**
         * タイトル変更
         * @param {string} title
         */
        setTitle(title) {

            this.title = String(title);
        }

        /**
         * 位置変更
         */
        setPosition(x, y) {

            this.panel.setPosition(x, y);
        }

        /**
         * サイズ変更
         */
        setSize(width, height) {

            this.panel.setSize(width, height);
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
         * 表示中判定
         */
        isVisible() {

            return this.visible;
        }

    }

    window.Window = Window;

})();