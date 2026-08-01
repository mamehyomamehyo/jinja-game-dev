/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/QuestManager.js
 * クエスト管理
 * ==========================================================
 */

(() => {
    "use strict";

    class QuestManager {

        /**
         * @param {GameData} gameData
         */
        constructor(gameData) {

            this.gameData = gameData;

            this.quests = new Map();
            this.active = new Set();
            this.completed = new Set();

            this.completedQueue = [];
        }

        /**
         * クエスト登録
         * @param {Object} quest
         */
        register(quest) {

            if (!quest || !quest.id) {
                return false;
            }

            this.quests.set(quest.id, {
                ...quest
            });

            return true;
        }

        /**
         * クエスト開始
         * @param {string} questId
         */
        start(questId) {

            if (!this.quests.has(questId)) {
                return false;
            }

            if (this.completed.has(questId)) {
                return false;
            }

            this.active.add(questId);

            return true;
        }

        /**
         * クエスト更新
         */
        update() {

            for (const questId of this.active) {

                const quest = this.quests.get(questId);

                if (!quest) {
                    continue;
                }

                if (this.checkCondition(quest.condition)) {

                    this.complete(questId);
                }
            }
        }

        /**
         * 条件判定
         * @param {Object} condition
         */
        checkCondition(condition = {}) {

            const stats = this.gameData.statistics;
            const status = this.gameData.status;

            if (
                condition.faith !== undefined &&
                status.faith < condition.faith
            ) {
                return false;
            }

            if (
                condition.money !== undefined &&
                status.money < condition.money
            ) {
                return false;
            }

            if (
                condition.visitCount !== undefined &&
                stats.visitCount < condition.visitCount
            ) {
                return false;
            }

            if (
                condition.prayerCount !== undefined &&
                stats.prayerCount < condition.prayerCount
            ) {
                return false;
            }

            if (
                condition.fortuneCount !== undefined &&
                stats.fortuneCount < condition.fortuneCount
            ) {
                return false;
            }

            if (
                condition.purchaseCount !== undefined &&
                stats.purchaseCount < condition.purchaseCount
            ) {
                return false;
            }

            return true;
        }

        /**
         * クエスト達成
         * @param {string} questId
         */
        complete(questId) {

            if (!this.active.has(questId)) {
                return false;
            }

            const quest = this.quests.get(questId);

            this.active.delete(questId);
            this.completed.add(questId);

            this.applyReward(quest.reward);

            this.completedQueue.push(quest);

            return true;
        }

        /**
         * 報酬
         * @param {Object} reward
         */
        applyReward(reward = {}) {

            if (reward.money) {
                this.gameData.addMoney(reward.money);
            }

            if (reward.faith) {
                this.gameData.addFaith(reward.faith);
            }

            if (reward.exp) {
                this.gameData.player.exp += reward.exp;
            }
        }

        /**
         * クエスト取得
         * @param {string} questId
         */
        get(questId) {

            return this.quests.get(questId) || null;
        }

        /**
         * 実行中一覧
         */
        getActive() {

            return Array.from(this.active)
                .map(id => this.quests.get(id));
        }

        /**
         * 達成済み一覧
         */
        getCompleted() {

            return Array.from(this.completed)
                .map(id => this.quests.get(id));
        }

        /**
         * 達成通知取得
         */
        popCompleted() {

            if (this.completedQueue.length === 0) {
                return null;
            }

            return this.completedQueue.shift();
        }

        /**
         * 通知有無
         */
        hasCompleted() {

            return this.completedQueue.length > 0;
        }

        /**
         * リセット
         */
        reset() {

            this.active.clear();
            this.completed.clear();
            this.completedQueue.length = 0;
        }

    }

    window.QuestManager = QuestManager;

})();