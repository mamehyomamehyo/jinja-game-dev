/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/ShopScene.js
 * 授与所（ショップ）画面
 * ==========================================================
 */

(() => {
    "use strict";

    class ShopScene extends Scene {

        constructor(game) {

            super(game);

            this.shopManager = null;
            this.playerManager = null;

            this.menu = null;
            this.messageBox = null;

            this.items = [];
        }

        /**
         * シーン開始
         */
        enter() {

            this.shopManager =
                window.app.shopManager;

            this.playerManager =
                window.app.playerManager;

            if (
                this.shopManager &&
                typeof this.shopManager.getItems === "function"
            ) {

                this.items =
                    this.shopManager.getItems();

            } else {

                this.items = [
                    {
                        name: "開運守",
                        price: 1000
                    },
                    {
                        name: "交通安全守",
                        price: 800
                    },
                    {
                        name: "御朱印帳",
                        price: 2000
                    }
                ];
            }

            this.menu = new Menu(
                40,
                130,
                this.items.map(item =>
                    `${item.name}　${item.price}円`
                ).concat([
                    "メインメニューへ戻る"
                ])
            );

            this.menu.onConfirm =
                (item, index) => {

                    if (
                        index === this.items.length
                    ) {

                        this.game
                            .getSceneManager()
                            .change("main");

                        return;
                    }

                    this.buyItem(index);
                };

            this.messageBox =
                new MessageBox(
                    420,
                    130,
                    340,
                    360
                );

            this.messageBox.setTitle(
                "授与所"
            );

            this.messageBox.setMessage(
                "授与品をお選びください。"
            );
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
                "授与所",
                40,
                70,
                {
                    size: 38,
                    color: "#1f3b2d"
                }
            );

            if (this.playerManager) {

                renderer.text(
                    `所持金：${this.playerManager.getMoney()} 円`,
                    420,
                    80,
                    {
                        size: 20,
                        color: "#333333"
                    }
                );
            }

            this.menu.render(renderer);

            this.messageBox.render(renderer);
        }

        /**
         * 購入
         * @param {number} index
         */
        buyItem(index) {

            const item = this.items[index];

            if (!item) {
                return;
            }

            if (
                !this.playerManager ||
                this.playerManager.getMoney() < item.price
            ) {

                this.messageBox.setMessage(
                    "所持金が足りません。"
                );

                return;
            }

            if (
                this.shopManager &&
                typeof this.shopManager.buy === "function"
            ) {

                const result =
                    this.shopManager.buy(item);

                if (result) {

                    this.messageBox.setMessage(
                        `${item.name}を授かりました。`
                    );

                } else {

                    this.messageBox.setMessage(
                        "購入できませんでした。"
                    );
                }

            } else {

                this.playerManager.addMoney(
                    -item.price
                );

                this.messageBox.setMessage(
                    `${item.name}を授かりました。`
                );
            }
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

    window.ShopScene = ShopScene;

})();