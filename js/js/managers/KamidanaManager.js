/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/KamidanaManager.js
 * 神棚・御札管理
 * ==========================================================
 */

(() => {
    "use strict";

    class KamidanaManager {

        /**
         * @param {GameData} gameData
         * @param {InventoryManager} inventoryManager
         */
        constructor(gameData, inventoryManager) {

            this.gameData = gameData;
            this.inventory = inventoryManager;

            if (!this.gameData.kamidana) {

                this.gameData.kamidana = {
                    center: null,
                    left: null,
                    right: null
                };
            }
        }

        /**
         * 神棚取得
         */
        getKamidana() {

            return this.gameData.kamidana;
        }

        /**
         * 御札奉斎
         * @param {"center"|"left"|"right"} position
         * @param {string} itemId
         */
        placeOfuda(position, itemId) {

            if (!["center", "left", "right"].includes(position)) {
                return {
                    success: false,
                    message: "無効な位置です。"
                };
            }

            if (!this.inventory.has(itemId)) {
                return {
                    success: false,
                    message: "御札を所持していません。"
                };
            }

            const current = this.gameData.kamidana[position];

            if (current) {
                this.inventory.add(current);
            }

            this.inventory.remove(itemId);

            this.gameData.kamidana[position] = itemId;

            return {
                success: true,
                message: "御札を神棚へお祀りしました。"
            };
        }

        /**
         * 御札取り外し
         * @param {"center"|"left"|"right"} position
         */
        removeOfuda(position) {

            const itemId = this.gameData.kamidana[position];

            if (!itemId) {
                return false;
            }

            this.inventory.add(itemId);

            this.gameData.kamidana[position] = null;

            return true;
        }

        /**
         * 指定位置取得
         */
        getOfuda(position) {

            return this.gameData.kamidana[position];
        }

        /**
         * 奉斎済み判定
         */
        isPlaced(itemId) {

            const kamidana = this.gameData.kamidana;

            return (
                kamidana.center === itemId ||
                kamidana.left === itemId ||
                kamidana.right === itemId
            );
        }

        /**
         * 奉斎数
         */
        getPlacedCount() {

            let count = 0;

            for (const value of Object.values(this.gameData.kamidana)) {

                if (value) {
                    count++;
                }
            }

            return count;
        }

        /**
         * 神棚リセット
         */
        clear() {

            const kamidana = this.gameData.kamidana;

            for (const position of ["center", "left", "right"]) {

                if (kamidana[position]) {

                    this.inventory.add(kamidana[position]);

                    kamidana[position] = null;
                }
            }
        }

        /**
         * リセット
         */
        reset() {

            this.clear();
        }

    }

    window.KamidanaManager = KamidanaManager;

})();