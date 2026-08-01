/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/InventoryScene.js
 * 所持品シーン
 * ==========================================================
 */

(() => {
    "use strict";

    class InventoryScene {

        constructor(game) {

            this.game = game;

            this.renderer = game.getRenderer();
            this.input = game.input;

            this.cursor = 0;

            // 仮データ（後でSaveManagerと連携）
            this.items = [
                {
                    id: "omamori_health",
                    name: "健康守",
                    count: 1,
                    description: "健康を祈願した御守。"
                },
                {
                    id: "ema",
                    name: "絵馬",
                    count: 2,
                    description: "願い事を書いて奉納する。"
                },
                {
                    id: "goshuin",
                    name: "御朱印",
                    count: 5,
                    description: "参拝の証としていただいた御朱印。"
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

            if (this.items.length > 0) {

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
            }

            if (this.input.isPressed("Escape")) {

                this.game
                    .getSceneManager()
                    .change("main");
            }
        }

        /**
         * 描画
         */
        render() {

            this.renderer.clear("#f5f2e8");

            this.renderer.text(
                "所持品",
                CONFIG.GAME_WIDTH / 2,
                60,
                {
                    align: "center",
                    size: 40,
                    color: "#222222"
                }
            );

            if (this.items.length === 0) {

                this.renderer.text(
                    "所持品はありません",
                    CONFIG.GAME_WIDTH / 2,
                    CONFIG.GAME_HEIGHT / 2,
                    {
                        align: "center",
                        size: 24,
                        color: "#555555"
                    }
                );

            } else {

                for (let i = 0; i < this.items.length; i++) {

                    const item = this.items[i];
                    const selected = i === this.cursor;

                    if (selected) {

                        this.renderer.rect(
                            40,
                            100 + i * 50,
                            320,
                            38,
                            "#e6efd8"
                        );
                    }

                    this.renderer.text(
                        item.name,
                        60,
                        125 + i * 50,
                        {
                            size: 22,
                            color: selected
                                ? "#006400"
                                : "#333333"
                        }
                    );

                    this.renderer.text(
                        "×" + item.count,
                        340,
                        125 + i * 50,
                        {
                            align: "right",
                            size: 22,
                            color: "#333333"
                        }
                    );
                }

                const item = this.items[this.cursor];

                this.renderer.strokeRect(
                    390,
                    100,
                    CONFIG.GAME_WIDTH - 430,
                    220,
                    "#999999",
                    2
                );

                this.renderer.text(
                    item.name,
                    410,
                    140,
                    {
                        size: 26,
                        color: "#222222"
                    }
                );

                this.renderer.text(
                    `所持数：${item.count}`,
                    410,
                    180,
                    {
                        size: 20,
                        color: "#444444"
                    }
                );

                this.renderer.text(
                    item.description,
                    410,
                    230,
                    {
                        size: 20,
                        color: "#444444"
                    }
                );
            }

            this.renderer.text(
                "↑↓：選択　ESC：戻る",
                CONFIG.GAME_WIDTH / 2,
                CONFIG.GAME_HEIGHT - 25,
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

    window.InventoryScene = InventoryScene;

})();