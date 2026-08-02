/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/MainScene.js
 * メインシーン
 * ==========================================================
 */

(() => {
    "use strict";

    class MainScene extends Scene {

        constructor(game) {

            super(game);

            this.menu = null;
            this.messageBox = null;
            this.notificationView = null;

            this.playerManager = null;
            this.notificationManager = null;
        }

        /**
         * シーン開始
         */
        enter() {

            this.playerManager =
                window.app.playerManager;

            this.notificationManager =
                window.app.notificationManager;

            this.menu = new Menu(
                60,
                160,
                [
                    "マップへ移動",
                    "神社参拝",
                    "授与所",
                    "御朱印帳",
                    "所持品",
                    "神棚",
                    "クエスト",
                    "実績",
                    "セーブ",
                    "タイトルへ戻る"
                ]
            );

            this.menu.onConfirm =
                (item, index) => {

                    switch (index) {

                        case 0:
                            this.game
                                .getSceneManager()
                                .change("map");
                            break;

                        case 1:
                            this.game
                                .getSceneManager()
                                .change("shrine");
                            break;

                        case 2:
                            this.game
                                .getSceneManager()
                                .change("shop");
                            break;

                        case 3:
                            this.showMessage(
                                "御朱印帳は開発中です。"
                            );
                            break;

                        case 4:
                            this.game
                                .getSceneManager()
                                .change("inventory");
                            break;

                        case 5:
                            this.showMessage(
                                "神棚は開発中です。"
                            );
                            break;

                        case 6:
                            this.showMessage(
                                "クエスト画面は開発中です。"
                            );
                            break;

                        case 7:
                            this.showMessage(
                                "実績画面は開発中です。"
                            );
                            break;

                        case 8:
                            this.saveGame();
                            break;

                        case 9:
                            this.game
                                .getSceneManager()
                                .change("title");
                            break;
                    }
                };

            this.messageBox =
                new MessageBox(
                    420,
                    360,
                    340,
                    160
                );

            this.messageBox.setTitle(
                "お知らせ"
            );

            this.messageBox.setMessage(
                "ようこそ神社ゲームへ。"
            );

            this.notificationView =
                new NotificationView(
                    this.notificationManager
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

            this.notificationView.update(delta);
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
                "#f5f3ea"
            );

            renderer.text(
                "メインメニュー",
                60,
                80,
                {
                    size: 36,
                    color: "#1f3b2d"
                }
            );

            if (this.playerManager) {

                renderer.text(
                    `信仰値 : ${this.playerManager.getFaith()}`,
                    420,
                    70,
                    {
                        size: 20,
                        color: "#333333"
                    }
                );

                renderer.text(
                    `所持金 : ${this.playerManager.getMoney()} 円`,
                    420,
                    100,
                    {
                        size: 20,
                        color: "#333333"
                    }
                );
            }

            this.menu.render(renderer);

            this.messageBox.render(renderer);

            this.notificationView.render(renderer);
        }

        /**
         * メッセージ表示
         * @param {string} text
         */
        showMessage(text) {

            this.messageBox.setMessage(text);

            if (this.notificationManager) {

                this.notificationManager.add(
                    text,
                    "info",
                    2.5
                );
            }
        }

        /**
         * セーブ
         */
        saveGame() {

            try {

                if (
                    window.app.saveManager &&
                    typeof window.app.saveManager.save === "function"
                ) {

                    window.app.saveManager.save();

                    this.showMessage(
                        "セーブしました。"
                    );

                } else {

                    this.showMessage(
                        "セーブ機能が利用できません。"
                    );
                }

            } catch (error) {

                console.error(error);

                this.showMessage(
                    "セーブに失敗しました。"
                );
            }
        }

        /**
         * シーン終了
         */
        exit() {

            this.menu = null;
            this.messageBox = null;
            this.notificationView = null;
        }

    }

    window.MainScene = MainScene;

})();