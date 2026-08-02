/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/InventoryScene.js
 * 所持品画面
 * ==========================================================
 */

(() => {
    "use strict";

    class InventoryScene extends Scene {

        constructor(game) {

            super(game);

            this.inventoryManager = null;

            this.menu = null;
            this.messageBox = null;

            this.items = [];
        }

        /**
         * シーン開始
         */
        enter() {

            this.inventoryManager =
                window.app.inventoryManager;

            this.reloadItems();

            this.menu = new Menu(
                40,
                130,
                this.buildMenuItems()
            );

            this.menu.onConfirm =
                (item, index) => {

                    if (index >= this.items.length) {

                        this.game
                            .getSceneManager()
                            .change("main");

                        return;
                    }

                    this.showItem(index);
                };

            this.messageBox =
                new MessageBox(
                    420,
                    130,
                    340,
                    360
                );

            this.messageBox.setTitle(
                "所持品"
            );

            if (this.items.length === 0) {

                this.messageBox.setMessage(
                    "現在、所持品はありません。"
                );

            } else {

                this.showItem(0);
            }
        }

        /**
         * 所持品読込
         */
        reloadItems() {

            if (
                this.inventoryManager &&
                typeof this.inventoryManager.getItems === "function"
            ) {

                this.items =
                    this.inventoryManager.getItems();

            } else {

                this.items = [];
            }
        }

        /**
         * メニュー生成
         */
        buildMenuItems() {

            const menu = [];

            for (const item of this.items) {

                const quantity =
                    item.quantity ?? 1;

                menu.push(
                    `${item.name} ×${quantity}`
                );
            }

            menu.push(
                "メインメニューへ戻る"
            );

            return menu;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            this.menu.update(
                delta,
                this.game.input
            );

            if (
                this.game.input.isPressed("Escape")
            ) {

                this.game
                    .getSceneManager()
                    .change("main");
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            renderer.rect(
                0,
                0,
                CONFIG.GAME_WIDTH,
                CONFIG.GAME_HEIGHT,
                "#f8f5ec"
            );

            renderer.text(
                "所持品",
                40,
                70,
                {
                    size: 38,
                    color: "#1f3b2d"
                }
            );

            renderer.text(
                `所持数：${this.items.length}`,
                40,
                100,
                {
                    size: 18,
                    color: "#555555"
                }
            );

            this.menu.render(renderer);

            this.messageBox.render(renderer);
        }

        /**
         * アイテム情報表示
         * @param {number} index
         */
        showItem(index) {

            const item = this.items[index];

            if (!item) {
                return;
            }

            let text = "";

            text +=
                `${item.name}\n\n`;

            if (item.description) {

                text +=
                    item.description;

            } else {

                text +=
                    "説明はありません。";
            }

            text += "\n\n";

            text +=
                `個数：${item.quantity ?? 1}`;

            if (item.category) {

                text +=
                    `\n分類：${item.category}`;
            }

            this.messageBox.setMessage(text);
        }

        /**
         * シーン終了
         */
        exit() {

            this.menu = null;
            this.messageBox = null;

            this.items = [];
        }

    }

    window.InventoryScene = InventoryScene;

})();