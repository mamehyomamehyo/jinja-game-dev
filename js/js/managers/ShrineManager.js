/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/ShrineManager.js
 * 神社管理
 * ==========================================================
 */

(() => {
    "use strict";

    class ShrineManager {

        /**
         * @param {GameData} gameData
         * @param {ShrineData} shrineData
         * @param {InventoryManager} inventoryManager
         */
        constructor(gameData, shrineData, inventoryManager = null) {

            this.gameData = gameData;
            this.shrineData = shrineData;
            this.inventory = inventoryManager;

            this.currentShrineId = "home";
        }

        /**
         * 現在の神社設定
         * @param {string} shrineId
         */
        setCurrentShrine(shrineId) {

            const shrine = this.shrineData.get(shrineId);

            if (!shrine) {
                return false;
            }

            this.currentShrineId = shrineId;

            return true;
        }

        /**
         * 現在の神社取得
         */
        getCurrentShrine() {

            return this.shrineData.get(this.currentShrineId);
        }

        /**
         * 参拝
         */
        pray() {

            const shrine = this.getCurrentShrine();

            if (!shrine) {
                return false;
            }

            this.shrineData.visit(shrine.id);
            this.shrineData.addFaith(shrine.id, 10);

            this.gameData.addFaith(10);
            this.gameData.addStat("visitCount");
            this.gameData.addStat("prayerCount");

            return {
                success: true,
                shrineId: shrine.id,
                shrineName: shrine.name,
                faith: 10,
                message: `${shrine.name}で参拝しました。`
            };
        }

        /**
         * おみくじ
         */
        drawFortune() {

            this.gameData.addStat("fortuneCount");

            return true;
        }

        /**
         * 授与品購入
         * @param {string} itemId
         * @param {number} price
         */
        purchase(itemId, price) {

            if (!this.gameData.spendMoney(price)) {
                return false;
            }

            if (this.inventory) {
                this.inventory.add(itemId);
            }

            this.gameData.addStat("purchaseCount");

            return true;
        }

        /**
         * 神社解放
         * @param {string} shrineId
         */
        unlockShrine(shrineId) {

            return this.shrineData.unlock(shrineId);
        }

        /**
         * 解放済み神社
         */
        getUnlockedShrines() {

            return this.shrineData.getUnlocked();
        }

        /**
         * 神社信仰値
         * @param {string} shrineId
         */
        getFaith(shrineId = this.currentShrineId) {

            const shrine = this.shrineData.get(shrineId);

            return shrine ? shrine.faith : 0;
        }

        /**
         * 神社レベル
         * @param {string} shrineId
         */
        getLevel(shrineId = this.currentShrineId) {

            const shrine = this.shrineData.get(shrineId);

            return shrine ? shrine.level : 1;
        }

        /**
         * 神社一覧
         */
        getAllShrines() {

            return this.shrineData.getAll();
        }

    }

    window.ShrineManager = ShrineManager;

})();