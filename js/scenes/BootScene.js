/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/scenes/BootScene.js
 * 起動シーン
 * ==========================================================
 */

(() => {
    "use strict";

    class BootScene extends Scene {

        constructor(game) {

            super(game);

            this.loader = null;

            this.progress = 0;
            this.loading = false;
            this.completed = false;

            this.message = "初期化中...";
        }

        /**
         * シーン開始
         */
        async enter() {

            this.loader = new ResourceLoader(
                this.game.assetManager
            );

            this.registerResources();

            this.loading = true;
            this.completed = false;

            this.message = "リソースを読み込んでいます...";

            try {

                await this.loader.load();

                this.completed = true;
                this.loading = false;

                this.message = "完了";

            } catch (error) {

                console.error(error);

                this.loading = false;

                this.message = "読み込みエラー";
            }
        }

        /**
         * リソース登録
         */
        registerResources() {

            /*
             * 画像
             * 必要に応じて追加してください。
             *
             * this.loader.addImage(
             *     "title",
             *     "assets/images/title.png"
             * );
             */

            /*
             * 音声
             *
             * this.loader.addAudio(
             *     "bgm_title",
             *     "assets/audio/title.mp3"
             * );
             */

            /*
             * フォント
             *
             * this.loader.addFont(
             *     "main",
             *     "Noto Sans JP",
             *     "assets/fonts/NotoSansJP-Regular.ttf"
             * );
             */
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (this.loader) {
                this.progress = this.loader.getProgress();
            }

            if (this.completed) {

                this.game
                    .getSceneManager()
                    .change("title");
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
                "#f7f6f2"
            );

            renderer.text(
                "神社ゲーム",
                CONFIG.GAME_WIDTH / 2,
                140,
                {
                    align: "center",
                    size: 40,
                    color: "#222222"
                }
            );

            renderer.text(
                this.message,
                CONFIG.GAME_WIDTH / 2,
                240,
                {
                    align: "center",
                    size: 22,
                    color: "#555555"
                }
            );

            const barWidth = 420;
            const barHeight = 28;

            const x =
                (CONFIG.GAME_WIDTH - barWidth) / 2;

            const y = 300;

            renderer.strokeRect(
                x,
                y,
                barWidth,
                barHeight,
                "#444444",
                2
            );

            renderer.rect(
                x,
                y,
                barWidth * this.progress,
                barHeight,
                "#2e8b57"
            );

            renderer.text(
                `${Math.floor(this.progress * 100)}%`,
                CONFIG.GAME_WIDTH / 2,
                y + 55,
                {
                    align: "center",
                    size: 18,
                    color: "#333333"
                }
            );
        }

        /**
         * シーン終了
         */
        exit() {

            this.loading = false;
        }

    }

    window.BootScene = BootScene;

})();