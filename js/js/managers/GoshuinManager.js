/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/GoshuinManager.js
 * 御朱印帳管理
 * ==========================================================
 */

(() => {
    "use strict";

    class GoshuinManager {

        /**
         * @param {GameData} gameData
         * @param {ShrineData} shrineData
         */
        constructor(gameData, shrineData) {

            this.gameData = gameData;
            this.shrineData = shrineData;

            if (!Array.isArray(this.gameData.goshuinBook)) {
                this.gameData.goshuinBook = [];
            }
        }

        /**
         * 御朱印を授与
         * @param {string} shrineId
         */
        receive(shrineId) {

            const shrine = this.shrineData.get(shrineId);

            if (!shrine) {
                return {
                    success: false,
                    message: "神社が見つかりません。"
                };
            }

            if (this.has(shrineId)) {
                return {
                    success: false,
                    message: "この御朱印は既にいただいています。"
                };
            }

            const goshuin = {
                shrineId,
                shrineName: shrine.name,
                prefecture: shrine.prefecture,
                receivedAt: Date.now()
            };

            this.gameData.goshuinBook.push(goshuin);

            return {
                success: true,
                goshuin,
                message: `${shrine.name}の御朱印をいただきました。`
            };
        }

        /**
         * 所持確認
         * @param {string} shrineId
         */
        has(shrineId) {

            return this.gameData.goshuinBook.some(
                item => item.shrineId === shrineId
            );
        }

        /**
         * 御朱印取得
         * @param {string} shrineId
         */
        get(shrineId) {

            return this.gameData.goshuinBook.find(
                item => item.shrineId === shrineId
            ) || null;
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.gameData.goshuinBook];
        }

        /**
         * 取得数
         */
        getCount() {

            return this.gameData.goshuinBook.length;
        }

        /**
         * 収集率（0～100）
         */
        getCompletionRate() {

            const total = this.shrineData.getAll().length;

            if (total === 0) {
                return 0;
            }

            return Math.floor(
                this.getCount() / total * 100
            );
        }

        /**
         * 御朱印帳クリア
         */
        clear() {

            this.gameData.goshuinBook.length = 0;
        }

        /**
         * リセット
         */
        reset() {

            this.clear();
        }

    }

    window.GoshuinManager = GoshuinManager;

})();