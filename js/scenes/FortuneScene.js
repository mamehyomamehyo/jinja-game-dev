/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/FortuneScene.js
 * おみくじ画面
 * ==========================================================
 */

(() => {
    "use strict";

    class FortuneScene extends Scene {

        constructor(game) {

            super(game);

            this.menu = null;
            this.messageBox = null;

            this.fortuneManager = null;
            this.playerManager = null;

            this.currentFortune = null;
        }

        /**
         * シーン開始
         */
        enter() {

            this.fortuneManager =
                window.app.fortuneManager;

            this.playerManager =
                window.app.playerManager;

            this.menu = new Menu(
                40,
                150,
                [
                    "おみくじを引く",
                    "前回の結果を見る",
                    "メインメニューへ戻る"
                ]
            );

            this.menu.onConfirm = (item, index) => {

                switch (index) {

                    case 0:
                        this.drawFortune();
                        break;

                    case 1:
                        this.showLastFortune();
                        break;

                    case 2:
                        this.game
                            .getSceneManager()
                            .change("main");
                        break;
                }

            };

            this.messageBox = new MessageBox(
                400,
                120,
                360,
                380
            );

            this.messageBox.setTitle("おみくじ");

            this.messageBox.setMessage(
                "「おみくじを引く」を選んでください。"
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
                "おみくじ",
                40,
                70,
                {
                    size: 38,
                    color: "#1f3b2d"
                }
            );

            renderer.text(
                "神様からの言葉をいただきましょう",
                40,
                105,
                {
                    size: 20,
                    color: "#666666"
                }
            );

            this.menu.render(renderer);

            this.messageBox.render(renderer);
        }

        /**
         * おみくじを引く
         */
        drawFortune() {

            if (
                this.fortuneManager &&
                typeof this.fortuneManager.draw === "function"
            ) {

                this.currentFortune =
                    this.fortuneManager.draw();

            } else {

                this.currentFortune = {
                    rank: "吉",
                    message:
                        "今日は穏やかな一日となるでしょう。",
                    blessing:
                        "焦らず一歩ずつ進みましょう。"
                };
            }

            let text = "";

            text += `【${this.currentFortune.rank}】\n\n`;

            text += this.currentFortune.message;

            if (this.currentFortune.blessing) {

                text += "\n\n";
                text += "ご神託\n";
                text += this.currentFortune.blessing;
            }

            this.messageBox.setMessage(text);
        }

        /**
         * 前回の結果
         */
        showLastFortune() {

            if (!this.currentFortune) {

                this.messageBox.setMessage(
                    "まだおみくじを引いていません。"
                );

                return;
            }

            let text = "";

            text += "前回のおみくじ\n\n";

            text += `【${this.currentFortune.rank}】\n\n`;

            text += this.currentFortune.message;

            if (this.currentFortune.blessing) {

                text += "\n\n";
                text += this.currentFortune.blessing;
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

    window.FortuneScene = FortuneScene;

})();