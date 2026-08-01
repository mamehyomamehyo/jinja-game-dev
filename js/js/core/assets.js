/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/assets.js
 * アセット管理
 * ==========================================================
 */

(() => {
    "use strict";

    class AssetManager {

        constructor() {

            this.images = new Map();
            this.json = new Map();

            this.total = 0;
            this.loaded = 0;
        }

        /**
         * 画像読み込み
         */
        loadImage(name, src) {

            this.total++;

            return new Promise((resolve, reject) => {

                const image = new Image();

                image.onload = () => {

                    this.images.set(name, image);
                    this.loaded++;

                    resolve(image);
                };

                image.onerror = () => reject(src);

                image.src = src;
            });
        }

        /**
         * JSON読み込み
         */
        async loadJson(name, src) {

            this.total++;

            const response = await fetch(src);

            if (!response.ok) {
                throw new Error(src);
            }

            const data = await response.json();

            this.json.set(name, data);

            this.loaded++;

            return data;
        }

        /**
         * 複数画像読み込み
         */
        async loadImages(list) {

            const tasks = [];

            for (const item of list) {
                tasks.push(this.loadImage(item.name, item.src));
            }

            return Promise.all(tasks);
        }

        /**
         * 複数JSON読み込み
         */
        async loadJsons(list) {

            const tasks = [];

            for (const item of list) {
                tasks.push(this.loadJson(item.name, item.src));
            }

            return Promise.all(tasks);
        }

        /**
         * 画像取得
         */
        getImage(name) {
            return this.images.get(name) || null;
        }

        /**
         * JSON取得
         */
        getJson(name) {
            return this.json.get(name) || null;
        }

        /**
         * 読み込み率
         */
        getProgress() {

            if (this.total === 0) {
                return 1;
            }

            return this.loaded / this.total;
        }

        /**
         * 完了判定
         */
        isLoaded() {

            return this.total > 0 &&
                   this.loaded === this.total;
        }

        /**
         * リセット
         */
        reset() {

            this.images.clear();
            this.json.clear();

            this.total = 0;
            this.loaded = 0;
        }

    }

    window.AssetManager = AssetManager;

})();