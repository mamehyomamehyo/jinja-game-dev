/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/ShopManager.js
 * 授与所（ショップ）管理
 * ==========================================================
 */

(() => {
    "use strict";

    class ShopManager {

        /**
         * @param {PlayerManager} playerManager
         * @param {InventoryManager} inventoryManager
         * @param {ItemData} itemData
         */
        constructor(
            playerManager,
            inventoryManager,
            itemData
        ) {

            this.playerManager = playerManager;
            this.inventoryManager = inventoryManager;
            this.itemData = itemData;
        }

        /**
         * 授与品一覧取得
         */
        getItems() {

            if (
                this.itemData &&
                typeof this.itemData.getAll === "function"
            ) {

                return this.itemData.getAll();
            }

            return [];
        }

        /**
         * ID指定取得
         * @param {string} itemId
         */
        getItem(itemId) {

            if (
                !this.itemData ||
                typeof this.itemData.get !== "function"
            ) {

                return null;
            }

            return this.itemData.get(itemId);
        }

        /**
         * 購入
         * @param {Object|string} item
         */
        buy(item) {

            if (!item) {
                return false;
            }

            const target =
                typeof item === "string"
                    ? this.getItem(item)
                    : item;

            if (!target) {
                return false;
            }

            const price = target.price ?? 0;

            if (
                this.playerManager.getMoney() < price
            ) {

                return false;
            }

            this.playerManager.addMoney(-price);

            this.inventoryManager.addItem({

                id: target.id,

                name: target.name,

                category:
                    target.category ?? "item",

                description:
                    target.description ?? "",

                quantity: 1
            });

            if (
                window.app &&
                window.app.notificationManager
            ) {

                window.app.notificationManager.add(
                    `${target.name}を授かりました。`,
                    "success",
                    3
                );
            }

            return true;
        }

        /**
         * 購入可能判定
         * @param {Object|string} item
         */
        canBuy(item) {

            const target =
                typeof item === "string"
                    ? this.getItem(item)
                    : item;

            if (!target) {
                return false;
            }

            return (
                this.playerManager.getMoney() >=
                (target.price ?? 0)
            );
        }

        /**
         * 所持金不足メッセージ
         */
        getInsufficientFundsMessage() {

            return "所持金が足りません。";
        }

        /**
         * 商品数
         */
        count() {

            return this.getItems().length;
        }

    }

    window.ShopManager = ShopManager;

})();