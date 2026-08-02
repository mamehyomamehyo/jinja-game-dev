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
        constructor(
            gameData,
            shrineData,
            inventoryManager
        ) {

            this.gameData = gameData;
            this.shrineData = shrineData;
            this.inventoryManager = inventoryManager;

            this.currentShrineId = null;
            this.visitedShrines = [];

            this.initialize();
        }

        /**
         * 初期化
         */
        initialize() {

            const shrines = this.getAll();

            if (shrines.length > 0) {
                this.currentShrineId = shrines[0].id;
            }
        }

        /**
         * 全神社取得
         */
        getAll() {

            if (
                this.shrineData &&
                typeof this.shrineData.getAll === "function"
            ) {

                return this.shrineData.getAll();
            }

            return [];
        }

        /**
         * 現在の神社取得
         */
        getCurrentShrine() {

            return this.getById(this.currentShrineId);
        }

        /**
         * ID指定取得
         * @param {string} shrineId
         */
        getById(shrineId) {

            if (
                !this.shrineData ||
                typeof this.shrineData.get !== "function"
            ) {

                return null;
            }

            return this.shrineData.get(shrineId);
        }

        /**
         * 現在の神社変更
         * @param {string} shrineId
         */
        setCurrentShrine(shrineId) {

            if (!this.getById(shrineId)) {
                return false;
            }

            this.currentShrineId = shrineId;

            return true;
        }

        /**
         * 参拝
         */
        pray() {

            const shrine = this.getCurrentShrine();

            if (!shrine) {
                return false;
            }

            if (
                !this.visitedShrines.includes(shrine.id)
            ) {

                this.visitedShrines.push(
                    shrine.id
                );
            }

            if (
                window.app &&
                window.app.playerManager
            ) {

                window.app.playerManager.addFaith(10);
                window.app.playerManager.addExp(5);
                window.app.playerManager.addPrayerCount();
            }

            if (
                window.app &&
                window.app.notificationManager
            ) {

                window.app.notificationManager.add(
                    `${shrine.name}を参拝しました。`,
                    "success",
                    3
                );
            }

            return true;
        }

        /**
         * 御朱印授与
         */
        receiveGoshuin() {

            const shrine = this.getCurrentShrine();

            if (!shrine) {
                return false;
            }

            if (
                !this.inventoryManager ||
                typeof this.inventoryManager.addItem !== "function"
            ) {

                return false;
            }

            this.inventoryManager.addItem({
                id: `goshuin_${shrine.id}`,
                name: `${shrine.name} 御朱印`,
                category: "goshuin",
                quantity: 1,
                description:
                    `${shrine.name}で拝受した御朱印です。`
            });

            return true;
        }

        /**
         * 参拝済み判定
         * @param {string} shrineId
         */
        hasVisited(shrineId) {

            return this.visitedShrines.includes(
                shrineId
            );
        }

        /**
         * 参拝済み一覧
         */
        getVisitedShrines() {

            return [...this.visitedShrines];
        }

        /**
         * 神社数
         */
        count() {

            return this.getAll().length;
        }

        /**
         * リセット
         */
        reset() {

            this.currentShrineId = null;
            this.visitedShrines = [];

            this.initialize();
        }

    }

    window.ShrineManager = ShrineManager;

})();