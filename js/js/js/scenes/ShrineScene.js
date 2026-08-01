/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/ShrineScene.js
 * 神社シーン
 * ==========================================================
 */

(() => {
    "use strict";

    class ShrineScene {

        constructor(game) {

            this.game = game;

            this.renderer = game.getRenderer();
            this.input = game.input;

            this.entities = new EntityManager();

            this.selectedMenu = 0;

            this.menu = [
                "参拝",
                "おみくじ",
                "授与所",
                "神社を出る"
            ];
        }

        /**
         * シーン開始
         */
        enter() {

            this.selectedMenu = 0;
            this.entities.clear();
        }

        /**
         * 更新
         */
        update(delta) {

            this.entities.update(delta);

            if (this.input.isPressed("ArrowUp")) {

                this.selectedMenu--;

                if (this.selectedMenu < 0) {
                    this.selectedMenu = this.menu.length - 1;
                }
            }

            if (this.input.isPressed("ArrowDown")) {

                this.selectedMenu++;

                if (this.selectedMenu >= this.menu.length) {
                    this.selectedMenu = 0;
                }
            }

            if (
                this.input.isPressed("Enter") ||
                this.input.isPressed("Space")
            ) {
                this.executeMenu();
            }

            if (this.input.isPressed("Escape")) {

                this.game
                    .getSceneManager()
                    .change("main");
            }
        }

        /**
         * メニュー実行
         */
        executeMenu() {

            switch (this.selectedMenu) {

                case 0:
                    console.log("参拝");
                    break;

                case 1:
                    console.log("おみくじ");
                    break;

                case 2:
                    console.log("授与所");
                    break;

                case 3:
                    this.game
                        .getSceneManager()
                        .change("main");
                    break;
            }
        }

        /**
         * 描画
         */
        render() {

            this.renderer.clear("#f8f4e6");

            this.renderer.text(
                "神社",
                CONFIG.GAME_WIDTH / 2,
                70,
                {
                    align: "center",
                    size: 40,
                    color: "#222222"
                }
            );

            for (let i = 0; i < this.menu.length; i++) {

                const selected = i === this.selectedMenu;

                if (selected) {

                    this.renderer.rect(
                        CONFIG.GAME_WIDTH / 2 - 140,
                        150 + i * 60,
                        280,
                        42,
                        "#dcefd4"
                    );
                }

                this.renderer.text(
                    this.menu[i],
                    CONFIG.GAME_WIDTH / 2,
                    178 + i * 60,
                    {
                        align: "center",
                        size: 26,
                        color: selected ? "#006400" : "#333333"
                    }
                );
            }

            this.renderer.text(
                "↑↓：選択　Enter：決定　ESC：戻る",
                CONFIG.GAME_WIDTH / 2,
                CONFIG.GAME_HEIGHT - 40,
                {
                    align: "center",
                    size: 18,
                    color: "#666666"
                }
            );

            this.entities.render(this.renderer);
        }

        /**
         * シーン終了
         */
        exit() {

            this.entities.clear();
        }

    }

    window.ShrineScene = ShrineScene;

})();