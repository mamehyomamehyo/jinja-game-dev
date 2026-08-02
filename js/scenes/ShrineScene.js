/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/ShrineScene.js
 * 神社参拝画面
 * ==========================================================
 */

(() => {
    "use strict";

    class ShrineScene extends Scene {

        constructor(game) {

            super(game);

            this.shrineManager = null;
            this.playerManager = null;

            this.menu = null;
            this.messageBox = null;

            this.currentShrine = null;
        }

        /**
         * シーン開始
         */
        enter() {

            this.shrineManager =
                window.app.shrineManager;

            this.playerManager =
                window.app.playerManager;

            this.currentShrine =
                this.shrineManager.getCurrentShrine();

            if (!this.currentShrine) {

                const shrines =
                    this.shrineManager.getAll();

                if (shrines.length > 0) {
                    this.currentShrine = shrines[0];
                }
            }

            this.menu = new Menu(
                40,
                150,
                [
                    "参拝する",
                    "お賽銭を納める",
                    "御朱印をいただく",
                    "神社情報を見る",
                    "メインメニューへ戻る"
                ]
            );

            this.menu.onConfirm =
                (item, index) => {

                    switch (index) {

                        case 0:
                            this.pray();
                            break;

                        case 1:
                            this.offer();
                            break;

                        case 2:
                            this.receiveGoshuin();
                            break;

                        case 3:
                            this.showShrineInfo();
                            break;

                        case 4:
                            this.game
                                .getSceneManager()
                                .change("main");
                            break;
                    }
                };

            this.messageBox =
                new MessageBox(
                    420,
                    130,
                    340,
                    360
                );

            this.messageBox.setTitle("神社");

            this.showShrineInfo();
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
                "神社参拝",
                40,
                70,
                {
                    size: 38,
                    color: "#1f3b2d"
                }
            );

            if (this.currentShrine) {

                renderer.text(
                    this.currentShrine.name,
                    40,
                    105,
                    {
                        size: 24,
                        color: "#444444"
                    }
                );
            }

            this.menu.render(renderer);

            this.messageBox.render(renderer);
        }

        /**
         * 参拝
         */
        pray() {

            if (
                this.shrineManager &&
                typeof this.shrineManager.pray === "function"
            ) {

                this.shrineManager.pray();

                this.messageBox.setMessage(
                    "心を込めて参拝しました。\n信仰値が上昇しました。"
                );

            } else {

                this.messageBox.setMessage(
                    "参拝機能は未実装です。"
                );
            }
        }

        /**
         * お賽銭
         */
        offer() {

            if (
                this.playerManager &&
                this.playerManager.getMoney() >= 100
            ) {

                this.playerManager.addMoney(-100);

                this.messageBox.setMessage(
                    "100円のお賽銭を納めました。"
                );

            } else {

                this.messageBox.setMessage(
                    "所持金が足りません。"
                );
            }
        }

        /**
         * 御朱印
         */
        receiveGoshuin() {

            this.messageBox.setMessage(
                "御朱印をいただきました。"
            );
        }

        /**
         * 神社情報
         */
        showShrineInfo() {

            if (!this.currentShrine) {

                this.messageBox.setMessage(
                    "神社情報がありません。"
                );

                return;
            }

            let text = "";

            text +=
                `神社名\n${this.currentShrine.name}\n\n`;

            if (this.currentShrine.prefecture) {

                text +=
                    `所在地\n${this.currentShrine.prefecture}\n\n`;
            }

            if (this.currentShrine.deity) {

                text +=
                    `祭神\n${this.currentShrine.deity}\n\n`;
            }

            if (this.currentShrine.description) {

                text +=
                    this.currentShrine.description;
            }

            this.messageBox.setMessage(text);
        }

        /**
         * シーン終了
         */
        exit() {

            this.menu = null;
            this.messageBox = null;
        }

    }

    window.ShrineScene = ShrineScene;

})();