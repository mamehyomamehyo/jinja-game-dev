/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/ShopScene.js
 * 授与所シーン
 * ==========================================================
 */

(() => {
    "use strict";

    class ShopScene {

        constructor(game) {

            this.game = game;

            this.renderer = game.getRenderer();
            this.input = game.input;

            this.cursor = 0;

            // 仮データ（後でJSONへ移行）
            this.items = [
                {
                    id: "omamori_health",
                    name: "健康守",
                    price: 500,
                    description: "健康を祈願した御守"
                },
                {
                    id: "omamori_luck",
                    name: "開運守",
                    price: 800,
                    description: "運気上昇を願う御守"
                },
                {
                    id: "ema",
                    name: "絵馬",
                    price: 300,
                    description: "願い事を書いて奉納"
                },
                {
                    id: "goshuin",
                    name: "御朱印",
                    price: 500,
                    description: "参拝の証"
                },
                {
                    id: "back",
                    name: "神社へ戻る",
                    price: 0,
                    description: ""
                }
            ];
        }

        /**
         * シーン開始
         */
        enter() {

            this.cursor = 0;
        }

        /**
         * 更新
         */
        update(delta) {

            if (this.input.isPressed("ArrowUp")) {

                this.cursor--;

                if (this.cursor < 0) {
                    this.cursor = this.items.length - 1;
                }
            }

            if (this.input.isPressed("ArrowDown")) {

                this.cursor++;

                if (this.cursor >= this.items.length) {
                    this.cursor = 0;
                }
            }

            if (
                this.input.isPressed("Enter") ||
                this.input.isPressed("Space")
            ) {
                this.select();
            }

            if (this.input.isPressed("Escape")) {

                this.game
                    .getSceneManager()
                    .change("shrine");
            }
        }

        /**
         * 選択
         */
        select() {

            const item = this.items[this.cursor];

            if (item.id === "back") {

                this.game
                    .getSceneManager()
                    .change("shrine");

                return;
            }

            // 仮実装（後で所持金・購入処理へ接続）
            console.log(
                `購入: ${item.name} (${item.price}円)`
            );
        }

        /**
         * 描画
         */
        render() {

            this.renderer.clear("#f7f1df");

            this.renderer.text(
                "授与所",
                CONFIG.GAME_WIDTH / 2,
                60,
                {
                    align: "center",
                    size: 40,
                    color: "#222222"
                }
            );

            for (let i = 0; i < this.items.length; i++) {

                const item = this.items[i];
                const selected = i === this.cursor;

                if (selected) {

                    this.renderer.rect(
                        70,
                        110 + i * 55,
                        CONFIG.GAME_WIDTH - 140,
                        42,
                        "#e5efd8"
                    );
                }

                this.renderer.text(
                    item.name,
                    100,
                    138 + i * 55,
                    {
                        size: 24,
                        color: selected ? "#006400" : "#333333"
                    }
                );

                if (item.price > 0) {

                    this.renderer.text(
                        `${item.price}円`,
                        CONFIG.GAME_WIDTH - 90,
                        138 + i * 55,
                        {
                            align: "right",
                            size: 22,
                            color: "#444444"
                        }
                    );
                }
            }

            const item = this.items[this.cursor];

            if (item.description) {

                this.renderer.strokeRect(
                    60,
                    CONFIG.GAME_HEIGHT - 150,
                    CONFIG.GAME_WIDTH - 120,
                    80,
                    "#999999",
                    2
                );

                this.renderer.text(
                    item.description,
                    80,
                    CONFIG.GAME_HEIGHT - 100,
                    {
                        size: 20,
                        color: "#333333"
                    }
                );
            }

            this.renderer.text(
                "↑↓：選択　Enter：決定　ESC：戻る",
                CONFIG.GAME_WIDTH / 2,
                CONFIG.GAME_HEIGHT - 20,
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

        }

    }

    window.ShopScene = ShopScene;

})();