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
        }

        /**
         * アイテム追加
         * @param {string} itemId
         * @param {number} count
         */
        add(itemId, count = 1) {

            const master = this.itemData.get(itemId);

            if (!master) {
                return false;
            }

            const item = this.gameData.getItem(itemId);

            if (item) {

                if (!master.stack) {
                    return false;
                }

                item.count += count;

            } else {

                this.gameData.inventory.push({
                    id: master.id,
                    name: master.name,
                    count
                });
            }

            return true;
        }

        /**
         * アイテム削除
         * @param {string} itemId
         * @param {number} count
         */
        remove(itemId, count = 1) {

            const item = this.gameData.getItem(itemId);

            if (!item) {
                return false;
            }

            if (item.count < count) {
                return false;
            }

            item.count -= count;

            if (item.count <= 0) {

                this.gameData.inventory =
                    this.gameData.inventory.filter(
                        i => i.id !== itemId
                    );
            }

            return true;
        }

        /**
         * アイテム使用
         * @param {string} itemId
         */
        use(itemId) {

            if (!this.has(itemId)) {
                return false;
            }

            // 現時点では使用＝1個消費
            return this.remove(itemId, 1);
        }

        /**
         * 所持確認
         * @param {string} itemId
         */
        has(itemId) {

            return this.gameData.hasItem(itemId);
        }

        /**
         * 所持数
         * @param {string} itemId
         */
        count(itemId) {

            const item = this.gameData.getItem(itemId);

            return item ? item.count : 0;
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.gameData.inventory];
        }

        /**
         * カテゴリ取得
         * @param {string} category
         */
        getByCategory(category) {

            return this.gameData.inventory.filter(item => {

                const master = this.itemData.get(item.id);

                return master && master.category === category;

            });
        }

        /**
         * 空判定
         */
        isEmpty() {

            return this.gameData.inventory.length === 0;
        }

        /**
         * 全削除
         */
        clear() {

            this.gameData.inventory.length = 0;
        }

    }

    window.InventoryManager = InventoryManager;

})();