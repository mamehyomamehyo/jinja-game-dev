/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/MapScene.js
 * マップ画面
 * ==========================================================
 */

(() => {
    "use strict";

    class MapScene extends Scene {

        constructor(game) {

            super(game);

            this.mapData = null;
            this.menu = null;
            this.messageBox = null;

            this.regions = [];
            this.selectedRegion = null;
        }

        /**
         * シーン開始
         */
        enter() {

            this.mapData = new MapData();

            this.regions = this.mapData.getAll();

            this.menu = new Menu(
                40,
                120,
                this.regions.map(region => region.name)
            );

            this.menu.onConfirm = (item, index) => {

                this.selectedRegion =
                    this.regions[index];

                this.updateMessage();
            };

            this.messageBox = new MessageBox(
                420,
                120,
                340,
                360
            );

            this.messageBox.setTitle("地域情報");

            if (this.regions.length > 0) {

                this.selectedRegion =
                    this.regions[0];

                this.updateMessage();
            }
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

            if (this.game.input.isPressed("Escape")) {

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
                "#eef6f0"
            );

            renderer.text(
                "日本マップ",
                40,
                60,
                {
                    size: 36,
                    color: "#1f3b2d"
                }
            );

            renderer.text(
                "↑↓：地域選択　Enter：詳細表示　Esc：戻る",
                40,
                90,
                {
                    size: 18,
                    color: "#555555"
                }
            );

            this.drawMap(renderer);

            this.menu.render(renderer);

            this.messageBox.render(renderer);
        }

        /**
         * 地図描画
         * @param {Renderer} renderer
         */
        drawMap(renderer) {

            for (const region of this.regions) {

                const selected =
                    this.selectedRegion &&
                    this.selectedRegion.id === region.id;

                renderer.circle(
                    region.position.x,
                    region.position.y,
                    selected ? 10 : 7,
                    selected
                        ? "#d32f2f"
                        : "#2e8b57"
                );

                renderer.text(
                    region.name,
                    region.position.x + 14,
                    region.position.y + 5,
                    {
                        size: 16,
                        color: "#222222"
                    }
                );
            }
        }

        /**
         * 地域情報更新
         */
        updateMessage() {

            if (!this.selectedRegion) {
                return;
            }

            const shrines =
                this.selectedRegion.shrines;

            let text = "";

            text +=
                `地方：${this.selectedRegion.region}\n\n`;

            if (shrines.length === 0) {

                text +=
                    "登録されている神社はありません。";

            } else {

                text +=
                    `登録神社数：${shrines.length}\n\n`;

                text +=
                    shrines.join("\n");
            }

            this.messageBox.setMessage(text);
        }

        /**
         * シーン終了
         */
        exit() {

            this.menu = null;
            this.messageBox = null;

            this.selectedRegion = null;
        }

    }

    window.MapScene = MapScene;

})();