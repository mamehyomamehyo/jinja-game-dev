/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/save.js
 * セーブデータ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class SaveManager {

        constructor(storageKey = CONFIG.SAVE_KEY) {

            this.storageKey = storageKey;
        }

        /**
         * デフォルトセーブデータ
         */
        createDefaultData() {

            return {

                version: CONFIG.VERSION,

                player: {
                    name: "",
                    level: 1,
                    exp: 0
                },

                shrine: {
                    faith: 0,
                    level: 1
                },

                inventory: [],

                flags: {},

                settings: {
                    bgm: 1.0,
                    se: 1.0
                },

                updated: Date.now()
            };
        }

        /**
         * 保存
         */
        save(data) {

            try {

                data.updated = Date.now();

                localStorage.setItem(
                    this.storageKey,
                    JSON.stringify(data)
                );

                return true;

            } catch (e) {

                console.error(e);
                return false;
            }
        }

        /**
         * 読み込み
         */
        load() {

            try {

                const raw = localStorage.getItem(this.storageKey);

                if (!raw) {
                    return this.createDefaultData();
                }

                const data = JSON.parse(raw);

                return this.#mergeDefaults(data);

            } catch (e) {

                console.error(e);

                return this.createDefaultData();
            }
        }

        /**
         * セーブ削除
         */
        clear() {

            localStorage.removeItem(this.storageKey);
        }

        /**
         * セーブ存在
         */
        exists() {

            return localStorage.getItem(this.storageKey) !== null;
        }

        /**
         * デフォルト値補完
         */
        #mergeDefaults(data) {

            const defaults = this.createDefaultData();

            return {

                ...defaults,
                ...data,

                player: {
                    ...defaults.player,
                    ...(data.player || {})
                },

                shrine: {
                    ...defaults.shrine,
                    ...(data.shrine || {})
                },

                settings: {
                    ...defaults.settings,
                    ...(data.settings || {})
                },

                inventory: Array.isArray(data.inventory)
                    ? data.inventory
                    : [],

                flags: data.flags || {}
            };
        }

    }

    window.SaveManager = SaveManager;

})();