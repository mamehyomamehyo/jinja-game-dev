/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/TitleScene.js
 * タイトル画面
 * ==========================================================
 */

(() => {
    "use strict";

    class TitleScene extends Scene {

        constructor(game) {

            super(game);

            this.menu = null;
            this.version = "v1.0";
        }

        /**
         * シーン開始
         */
        enter() {

            this.menu = new Menu(
                CONFIG.GAME_WIDTH / 2 - 110,
                260,
                [
                    "ゲーム開始",
                    "続きから",
                    "設定",
                    "終了"
                ]
            );

            this.menu.onConfirm =
                (item, index) => {

                    switch (index) {

                        case 0:

                            this.startGame();
                            break;

                        case 1:

                            this.continueGame();
                            break;

                        case 2:

                            this.openSettings();
                            break;

                        case 3:

                            this.exitGame();
                            break;
                    }
                };
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
                "#f7f6f2"
            );

            renderer.text(
                "神社ゲーム",
                CONFIG.GAME_WIDTH / 2,
                110,
                {
                    align: "center",
                    size: 52,
                    color: "#1f3b2d"
                }
            );

            renderer.text(
                "全国の神社を巡り、信仰を深めよう",
                CONFIG.GAME_WIDTH / 2,
                165,
                {
                    align: "center",
                    size: 22,
                    color: "#555555"
                }
            );

            this.menu.render(renderer);

            renderer.text(
                this.version,
                CONFIG.GAME_WIDTH - 15,
                CONFIG.GAME_HEIGHT - 15,
                {
                    align: "right",
                    size: 16,
                    color: "#777777"
                }
            );
        }

        /**
         * ゲーム開始
         */
        startGame() {

            this.game
                .getSceneManager()
                .change("main");
        }

        /**
         * 続きから
         */
        continueGame() {

            try {

                if (
                    this.game.save &&
                    typeof this.game.save.load === "function"
                ) {

                    this.game.save.load();

                    this.game
                        .getSceneManager()
                        .change("main");

                } else {

                    console.warn(
                        "セーブ機能が利用できません。"
                    );
                }

            } catch (error) {

                console.error(error);
            }
        }

        /**
         * 設定
         */
        openSettings() {

            console.log("設定画面（未実装）");
        }

        /**
         * 終了
         */
        exitGame() {

            console.log("ゲーム終了");

            /*
             * ブラウザでは通常終了できないため
             * 将来的にタイトルへ戻る、
             * またはElectron版対応予定。
             */
        }

        /**
         * シーン終了
         */
        exit() {

            this.menu = null;
        }

    }

    window.TitleScene = TitleScene;

})();