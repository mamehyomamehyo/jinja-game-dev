/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/FortuneScene.js
 * おみくじシーン
 * ==========================================================
 */

(() => {
    "use strict";

    class FortuneScene {

        constructor(game) {

            this.game = game;

            this.renderer = game.getRenderer();
            this.input = game.input;

            this.result = null;
            this.drawn = false;

            this.fortunes = [
                { name: "大吉", color: "#d32f2f" },
                { name: "中吉", color: "#f57c00" },
                { name: "小吉", color: "#388e3c" },
                { name: "吉",   color: "#1976d2" },
                { name: "末吉", color: "#7b1fa2" },
                { name: "凶",   color: "#555555" }
            ];
        }

        /**
         * シーン開始
         */
        enter() {

            this.result = null;
            this.drawn = false;
        }

        /**
         * 更新
         */
        update(delta) {

            if (!this.drawn) {

                if (
                    this.input.isPressed("Enter") ||
                    this.input.isPressed("Space") ||
                    this.input.isMousePressed()
                ) {
                    this.drawFortune();
                }

                return;
            }

            if (
                this.input.isPressed("Escape") ||
                this.input.isPressed("Enter")
            ) {
                this.game
                    .getSceneManager()
                    .change("shrine");
            }
        }

        /**
         * おみくじを引く
         */
        drawFortune() {

            this.result = Random.pick(this.fortunes);
            this.drawn = true;
        }

        /**
         * 描画
         */
        render() {

            this.renderer.clear("#f8f4e6");

            this.renderer.text(
                "おみくじ",
                CONFIG.GAME_WIDTH / 2,
                70,
                {
                    align: "center",
                    size: 40,
                    color: "#222222"
                }
            );

            if (!this.drawn) {

                this.renderer.text(
                    "Enter または タップでおみくじを引く",
                    CONFIG.GAME_WIDTH / 2,
                    CONFIG.GAME_HEIGHT / 2,
                    {
                        align: "center",
                        size: 24,
                        color: "#444444"
                    }
                );

                return;
            }

            this.renderer.text(
                this.result.name,
                CONFIG.GAME_WIDTH / 2,
                220,
                {
                    align: "center",
                    size: 56,
                    color: this.result.color
                }
            );

            this.renderer.text(
                "良い一日になりますように",
                CONFIG.GAME_WIDTH / 2,
                300,
                {
                    align: "center",
                    size: 24,
                    color: "#333333"
                }
            );

            this.renderer.text(
                "Enter または ESCで神社へ戻る",
                CONFIG.GAME_WIDTH / 2,
                CONFIG.GAME_HEIGHT - 60,
                {
                    align: "center",
                    size: 18,
                    color: "#666666"
                }
            );
        }

        /**
         * シーン終了
         */
        exit() {

            this.result = null;
            this.drawn = false;
        }

    }

    window.FortuneScene = FortuneScene;

})();