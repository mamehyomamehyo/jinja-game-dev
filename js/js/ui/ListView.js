/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/ui/ListView.js
 * リスト表示UIコンポーネント
 * ==========================================================
 */

(() => {
    "use strict";

    class ListView {

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {Array} items
         */
        constructor(
            x,
            y,
            width,
            height,
            items = []
        ) {

            this.x = x;
            this.y = y;

            this.width = width;
            this.height = height;

            this.items = [...items];

            this.visible = true;
            this.enabled = true;

            this.selectedIndex = 0;
            this.scrollIndex = 0;

            this.rowHeight = 36;
            this.padding = 8;

            this.onSelect = null;
            this.onConfirm = null;

            this.colors = {
                background: "#ffffff",
                border: "#666666",
                text: "#222222",
                selected: "#dcefd4",
                selectedText: "#006400"
            };
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
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            if (!this.visible) {
                return;
            }

            renderer.rect(
                this.x,
                this.y,
                this.width,
                this.height,
                this.colors.background
            );

            renderer.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height,
                this.colors.border,
                2
            );

            const visibleRows = Math.floor(
                (this.height - this.padding * 2) /
                this.rowHeight
            );

            for (let i = 0; i < visibleRows; i++) {

                const index = this.scrollIndex + i;

                if (index >= this.items.length) {
                    break;
                }

                const selected =
                    index === this.selectedIndex;

                const rowY =
                    this.y +
                    this.padding +
                    i * this.rowHeight;

                if (selected) {

                    renderer.rect(
                        this.x + 2,
                        rowY,
                        this.width - 4,
                        this.rowHeight,
                        this.colors.selected
                    );
                }

                const item = this.items[index];

                const text =
                    typeof item === "string"
                        ? item
                        : item.name ?? String(item);

                renderer.text(
                    text,
                    this.x + 12,
                    rowY + this.rowHeight / 2,
                    {
                        baseline: "middle",
                        size: 20,
                        color: selected
                            ? this.colors.selectedText
                            : this.colors.text
                    }
                );
            }
        }

        /**
         * 上へ
         */
        moveUp() {

            if (this.items.length === 0) {
                return;
            }

            this.selectedIndex--;

            if (this.selectedIndex < 0) {
                this.selectedIndex = this.items.length - 1;
            }

            this.adjustScroll();

            if (typeof this.onSelect === "function") {
                this.onSelect(
                    this.getSelected(),
                    this.selectedIndex
                );
            }
        }

        /**
         * 下へ
         */
        moveDown() {

            if (this.items.length === 0) {
                return;
            }

            this.selectedIndex++;

            if (this.selectedIndex >= this.items.length) {
                this.selectedIndex = 0;
            }

            this.adjustScroll();

            if (typeof this.onSelect === "function") {
                this.onSelect(
                    this.getSelected(),
                    this.selectedIndex
                );
            }
        }

        /**
         * スクロール調整
         */
        adjustScroll() {

            const visibleRows = Math.floor(
                (this.height - this.padding * 2) /
                this.rowHeight
            );

            if (this.selectedIndex < this.scrollIndex) {
                this.scrollIndex = this.selectedIndex;
            }

            if (
                this.selectedIndex >=
                this.scrollIndex + visibleRows
            ) {

                this.scrollIndex =
                    this.selectedIndex -
                    visibleRows +
                    1;
            }
        }

        /**
         * リスト設定
         */
        setItems(items) {

            this.items = [...items];

            this.selectedIndex = 0;
            this.scrollIndex = 0;
        }

        /**
         * 選択項目
         */
        getSelected() {

            return this.items[this.selectedIndex] ?? null;
        }

        /**
         * 選択位置
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

            this.adjustScroll();
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

    window.ListView = ListView;

})();