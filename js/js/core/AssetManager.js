/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/AssetManager.js
 * アセット管理
 * ==========================================================
 */

(() => {
    "use strict";

    class AssetManager {

        constructor() {

            this.images = new Map();
            this.audio = new Map();
            this.fonts = new Map();

            this.totalCount = 0;
            this.loadedCount = 0;
        }

        /**
         * 画像登録
         * @param {string} key
         * @param {string} src
         */
        loadImage(key, src) {

            this.totalCount++;

            return new Promise((resolve, reject) => {

                const image = new Image();

                image.onload = () => {

                    this.images.set(key, image);
                    this.loadedCount++;

                    resolve(image);
                };

                image.onerror = () => {

                    reject(
                        new Error(`画像を読み込めません: ${src}`)
                    );
                };

                image.src = src;

            });
        }

        /**
         * 音声登録
         * @param {string} key
         * @param {string} src
         */
        loadAudio(key, src) {

            this.totalCount++;

            return new Promise((resolve, reject) => {

                const audio = new Audio();

                const complete = () => {

                    this.audio.set(key, audio);
                    this.loadedCount++;

                    resolve(audio);
                };

                audio.addEventListener(
                    "canplaythrough",
                    complete,
                    { once: true }
                );

                audio.onerror = () => {

                    reject(
                        new Error(`音声を読み込めません: ${src}`)
                    );
                };

                audio.src = src;

                audio.load();

            });
        }

        /**
         * フォント登録
         * @param {string} key
         * @param {string} family
         * @param {string} url
         */
        async loadFont(key, family, url) {

            this.totalCount++;

            const font = new FontFace(
                family,
                `url(${url})`
            );

            await font.load();

            document.fonts.add(font);

            this.fonts.set(key, family);

            this.loadedCount++;

            return family;
        }

        /**
         * 画像取得
         */
        getImage(key) {

            return this.images.get(key) || null;
        }

        /**
         * 音声取得
         */
        getAudio(key) {

            return this.audio.get(key) || null;
        }

        /**
         * フォント取得
         */
        getFont(key) {

            return this.fonts.get(key) || null;
        }

        /**
         * 読み込み率
         */
        getProgress() {

            if (this.totalCount === 0) {
                return 1;
            }

            return this.loadedCount / this.totalCount;
        }

        /**
         * 読み込み完了判定
         */
        isLoaded() {

            return (
                this.totalCount > 0 &&
                this.loadedCount >= this.totalCount
            );
        }

        /**
         * 全削除
         */
        clear() {

            this.images.clear();
            this.audio.clear();
            this.fonts.clear();

            this.totalCount = 0;
            this.loadedCount = 0;
        }

    }

    window.AssetManager = AssetManager;

})();