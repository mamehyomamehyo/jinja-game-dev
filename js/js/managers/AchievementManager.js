/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/AchievementManager.js
 * 実績管理
 * ==========================================================
 */

(() => {
    "use strict";

    class AchievementManager {

        /**
         * @param {GameData} gameData
         * @param {EventData} eventData
         */
        constructor(gameData, eventData) {

            this.gameData = gameData;
            this.eventData = eventData;

            this.unlocked = new Set();
            this.queue = [];
        }

        /**
         * 実績判定
         */
        update() {

            const events = this.eventData.getByType("achievement");

            for (const achievement of events) {

                if (this.unlocked.has(achievement.id)) {
                    continue;
                }

                if (!this.check(achievement.condition)) {
                    continue;
                }

                this.unlock(achievement);
            }
        }

        /**
         * 条件判定
         */
        check(condition) {

            const stats = this.gameData.statistics;
            const status = this.gameData.status;

            if (
                condition.faith !== undefined &&
                status.faith < condition.faith
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
         * 実績解除
         */
        unlock(achievement) {

            this.unlocked.add(achievement.id);

            this.applyReward(achievement.reward);

            this.queue.push(achievement);
        }

        /**
         * 報酬
         */
        applyReward(reward) {

            if (!reward) {
                return;
            }

            if (reward.faith) {
                this.gameData.addFaith(reward.faith);
            }

            if (reward.money) {
                this.gameData.addMoney(reward.money);
            }
        }

        /**
         * 実績取得済み
         */
        isUnlocked(id) {

            return this.unlocked.has(id);
        }

        /**
         * 実績数
         */
        getCount() {

            return this.unlocked.size;
        }

        /**
         * 実績一覧
         */
        getUnlocked() {

            return Array.from(this.unlocked);
        }

        /**
         * 通知取得
         */
        pop() {

            if (this.queue.length === 0) {
                return null;
            }

            return this.queue.shift();
        }

        /**
         * 通知あり
         */
        hasNotification() {

            return this.queue.length > 0;
        }

        /**
         * リセット
         */
        reset() {

            this.unlocked.clear();
            this.queue.length = 0;
        }

    }

    window.AchievementManager = AchievementManager;

})();