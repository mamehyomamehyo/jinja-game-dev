/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/ResourceLoader.js
 * リソース一括読込
 * ==========================================================
 */

(() => {
    "use strict";

    class ResourceLoader {

        /**
         * @param {AssetManager} assetManager
         */
        constructor(assetManager) {

            this.assetManager = assetManager;

            this.queue = [];
            this.loaded = false;
        }

        /**
         * 画像追加
         * @param {string} key
         * @param {string} src
         */
        addImage(key, src) {

            this.queue.push({
                type: "image",
                key,
                src
            });

            return this;
        }

        /**
         * 音声追加
         * @param {string} key
         * @param {string} src
         */
        addAudio(key, src) {

            this.queue.push({
                type: "audio",
                key,
                src
            });

            return this;
        }

        /**
         * フォント追加
         * @param {string} key
         * @param {string} family
         * @param {string} src
         */
        addFont(key, family, src) {

            this.queue.push({
                type: "font",
                key,
                family,
                src
            });

            return this;
        }

        /**
         * 読み込み実行
         */
        async load() {

            this.loaded = false;

            for (const asset of this.queue) {

                switch (asset.type) {

                    case "image":

                        await this.assetManager.loadImage(
                            asset.key,
                            asset.src
                        );

                        break;

                    case "audio":

                        await this.assetManager.loadAudio(
                            asset.key,
                            asset.src
                        );

                        break;

                    case "font":

                        await this.assetManager.loadFont(
                            asset.key,
                            asset.family,
                            asset.src
                        );

                        break;
                }
            }

            this.loaded = true;

            return true;
        }

        /**
         * 読込済み判定
         */
        isLoaded() {

            return this.loaded;
        }

        /**
         * 読み込み率
         */
        getProgress() {

            return this.assetManager.getProgress();
        }

        /**
         * 登録数
         */
        getCount() {

            return this.queue.length;
        }

        /**
         * 登録一覧
         */
        getQueue() {

            return [...this.queue];
        }

        /**
         * 登録クリア
         */
        clearQueue() {

            this.queue.length = 0;
        }

        /**
         * リセット
         */
        reset() {

            this.clearQueue();

            this.loaded = false;
        }

    }

    window.ResourceLoader = ResourceLoader;

})();