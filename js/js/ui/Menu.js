/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/Menu.js
 * メニューUIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class Menu {

        /**
         * @param {number} x
         * @param {number} y
         * @param {Array} items
         */
        constructor(
            x,
            y,
            items = []
        ) {

            this.x = x;
            this.y = y;

            this.items = [...items];

            this.visible = true;
            this.enabled = true;

            this.selectedIndex = 0;

            this.itemHeight = 42;

            this.colors = {
                normal: "#333333",
                selected: "#006400",
                highlight: "#dcefd4"
            };

            this.onChange = null;
            this.onConfirm = null;
            this.onCancel = null;
        }

        /**
         * 更新
         * @param {number} delta
         * @param {Input} input
         */
        update(delta, input) {

            if (!this.visible || !this.enabled) {
                return;
            }

            if (input.isPressed("ArrowUp")) {
                this.moveUp();
            }

            if (input.isPressed("ArrowDown")) {
                this.moveDown();
            }

            if (
                input.isPressed("Enter") ||
                input.isPressed("Space")
            ) {

                if (typeof this.onConfirm === "function") {
                    this.onConfirm(
                        this.getSelected(),
                        this.selectedIndex
                    );
                }
            }

            if (input.isPressed("Escape")) {

                if (typeof this.onCancel === "function") {
                    this.onCancel();
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

            for (let i = 0; i < this.items.length; i++) {

                const selected =
                    i === this.selectedIndex;

                const y =
                    this.y + i * this.itemHeight;

                if (selected) {

                    renderer.rect(
                        this.x - 10,
                        y - 24,
                        260,
                        36,
                        this.colors.highlight
                    );
                }

                const item = this.items[i];

                const text =
                    typeof item === "string"
                        ? item
                        : item.name ?? String(item);

                renderer.text(
                    text,
                    this.x,
                    y,
                    {
                        size: 24,
                        color: selected
                            ? this.colors.selected
                            : this.colors.normal
                    }
                );
            }
        }

        /**
         * 上へ移動
         */
        moveUp() {

            if (this.items.length === 0) {
                return;
            }

            this.selectedIndex--;

            if (this.selectedIndex < 0) {
                this.selectedIndex =
                    this.items.length - 1;
            }

            this.notifyChange();
        }

        /**
         * 下へ移動
         */
        moveDown() {

            if (this.items.length === 0) {
                return;
            }

            this.selectedIndex++;

            if (this.selectedIndex >= this.items.length) {
                this.selectedIndex = 0;
            }

            this.notifyChange();
        }

        /**
         * 選択変更通知
         */
        notifyChange() {

            if (typeof this.onChange === "function") {

                this.onChange(
                    this.getSelected(),
                    this.selectedIndex
                );
            }
        }

        /**
         * メニュー設定
         */
        setItems(items) {

            this.items = [...items];

            this.selectedIndex = 0;
        }

        /**
         * 選択取得
         */
        getSelected() {

            return this.items[this.selectedIndex] ?? null;
        }

        /**
         * 選択番号取得
         */
        getSelectedIndex() {

            return this.selectedIndex;
        }

        /**
         * 選択変更
         */
        setSelectedIndex(index) {

            if (
                index < 0 ||
                index >= this.items.length
            ) {
                return;
            }

            this.selectedIndex = index;

            this.notifyChange();
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

    }

    window.Menu = Menu;

})();