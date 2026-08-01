/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/TitleScene.js
 * タイトルシーン
 * ==========================================================
 */

(() => {
    "use strict";

    class TitleScene {

        constructor(game) {

            this.game = game;

            this.renderer = new Renderer(
                game.getContext()
            );

            this.input = game.input || null;

            this.blink = 0;
            this.showMessage = true;
        }

        /**
         * シーン開始
         */
        enter() {

            this.blink = 0;
            this.showMessage = true;
        }

        /**
         * 更新
         */
        update(delta) {

            this.blink += delta;

            if (this.blink >= 0.5) {

                this.blink = 0;
                this.showMessage = !this.showMessage;
            }

            if (!this.input) {
                return;
            }

            if (
                this.input.isMousePressed() ||
                this.input.isPressed("Enter") ||
                this.input.isPressed("Space")
            ) {
                this.game
                    .getSceneManager()
                    .change("main");
            }
        }

        /**
         * 描画
         */
        render() {

            this.renderer.clear("#f8f4e6");

            this.renderer.text(
                "神社ゲーム",
                CONFIG.GAME_WIDTH / 2,
                150,
                {
                    align: "center",
                    size: 52,
                    color: "#222222"
                }
            );

            this.renderer.text(
                "Shinto Shrine Game",
                CONFIG.GAME_WIDTH / 2,
                200,
                {
                    align: "center",
                    size: 20,
                    color: "#666666"
                }
            );

            if (this.showMessage) {

                this.renderer.text(
                    "クリック または Enterキーで開始",
                    CONFIG.GAME_WIDTH / 2,
                    CONFIG.GAME_HEIGHT - 120,
                    {
                        align: "center",
                        size: 24,
                        color: "#444444"
                    }
                );
            }

            this.renderer.text(
                "Version " + CONFIG.VERSION,
                CONFIG.GAME_WIDTH - 20,
                CONFIG.GAME_HEIGHT - 20,
                {
                    align: "right",
                    size: 16,
                    color: "#777777"
                }
            );
        }

        /**
         * シーン終了
         */
        exit() {

        }

    }

    window.TitleScene = TitleScene;

})();