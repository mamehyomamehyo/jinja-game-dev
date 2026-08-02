/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/InventoryManager.js
 * 所持品管理
 * ==========================================================
 */

(() => {
    "use strict";

    class InventoryManager {

        /**
         * @param {GameData} gameData
         * @param {ItemData} itemData
         */
        constructor(gameData, itemData) {

            this.gameData = gameData;
            this.itemData = itemData;

            this.items = [];

            this.initialize();
        }

        /**
         * 初期化
         */
        initialize() {

            this.items = [];
        }

        /**
         * 全取得
         */
        getItems() {

            return [...this.items];
        }

        /**
         * アイテム取得
         * @param {string} id
         */
        getItem(id) {

            return this.items.find(
                item => item.id === id
            ) || null;
        }

        /**
         * 所持判定
         * @param {string} id
         */
        hasItem(id) {

            return this.getItem(id) !== null;
        }

        /**
         * アイテム追加
         * @param {Object} item
         */
        addItem(item) {

            if (!item || !item.id) {
                return false;
            }

            const existing = this.getItem(item.id);

            if (existing) {

                existing.quantity +=
                    item.quantity ?? 1;

                return true;
            }

            this.items.push({

                id: item.id,

                name:
                    item.name ?? "名称未設定",

                category:
                    item.category ?? "other",

                description:
                    item.description ?? "",

                quantity:
                    item.quantity ?? 1
            });

            return true;
        }

        /**
         * アイテム削除
         * @param {string} id
         * @param {number} quantity
         */
        removeItem(id, quantity = 1) {

            const item = this.getItem(id);

            if (!item) {
                return false;
            }

            item.quantity -= quantity;

            if (item.quantity <= 0) {

                this.items =
                    this.items.filter(
                        data => data.id !== id
                    );
            }

            return true;
        }

        /**
         * 個数取得
         * @param {string} id
         */
        getQuantity(id) {

            const item = this.getItem(id);

            if (!item) {
                return 0;
            }

            return item.quantity;
        }

        /**
         * カテゴリ検索
         * @param {string} category
         */
        getByCategory(category) {

            return this.items.filter(
                item =>
                    item.category === category
            );
        }

        /**
         * 使用
         * @param {string} id
         */
        useItem(id) {

            const item = this.getItem(id);

            if (!item) {
                return false;
            }

            switch (item.category) {

                case "consumable":

                    this.removeItem(id);

                    return true;

                default:

                    return true;
            }
        }

        /**
         * 所持数
         */
        count() {

            return this.items.length;
        }

        /**
         * 全削除
         */
        clear() {

            this.items = [];
        }

        /**
         * セーブデータ
         */
        toJSON() {

            return [...this.items];
        }

        /**
         * 読込
         * @param {Array} data
         */
        fromJSON(data) {

            this.items = [];

            if (!Array.isArray(data)) {
                return;
            }

            for (const item of data) {

                this.addItem(item);
            }
        }

    }

    window.InventoryManager = InventoryManager;

})();