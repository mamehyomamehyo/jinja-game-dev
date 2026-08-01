/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/StatisticsManager.js
 * プレイ統計管理
 * ==========================================================
 */

(() => {
    "use strict";

    class StatisticsManager {

        /**
         * @param {GameData} gameData
         */
        constructor(gameData) {

            this.gameData = gameData;

            this.initialize();
        }

        /**
         * 初期化
         */
        initialize() {

            if (!this.gameData.statistics) {

                this.gameData.statistics = {};
            }

            const defaults = {

                visitCount: 0,
                prayerCount: 0,
                fortuneCount: 0,
                purchaseCount: 0,

                totalMoneyEarned: 0,
                totalMoneySpent: 0,
                totalDonation: 0,

                totalFaith: 0,
                totalExp: 0,

                playTime: 0,

                shrineUnlocked: 0,
                goshuinCollected: 0,

                lastPlayed: Date.now()
            };

            Object.assign(
                defaults,
                this.gameData.statistics
            );

            this.gameData.statistics = defaults;
        }

        /**
         * 値取得
         */
        get(name) {

            return this.gameData.statistics[name] ?? 0;
        }

        /**
         * 値設定
         */
        set(name, value) {

            this.gameData.statistics[name] = value;
        }

        /**
         * 加算
         */
        add(name, value = 1) {

            if (!(name in this.gameData.statistics)) {

                this.gameData.statistics[name] = 0;
            }

            this.gameData.statistics[name] += value;
        }

        /**
         * プレイ時間更新
         * @param {number} delta 秒
         */
        update(delta) {

            this.gameData.statistics.playTime += delta;
        }

        /**
         * プレイ時間取得（秒）
         */
        getPlayTime() {

            return Math.floor(
                this.gameData.statistics.playTime
            );
        }

        /**
         * プレイ時間（HH:MM:SS）
         */
        getPlayTimeText() {

            const total = this.getPlayTime();

            const hour = Math.floor(total / 3600);
            const minute = Math.floor(total % 3600 / 60);
            const second = total % 60;

            return (
                Utils.pad(hour) + ":" +
                Utils.pad(minute) + ":" +
                Utils.pad(second)
            );
        }

        /**
         * 最終プレイ更新
         */
        touch() {

            this.gameData.statistics.lastPlayed =
                Date.now();
        }

        /**
         * 全取得
         */
        getAll() {

            return {
                ...this.gameData.statistics
            };
        }

        /**
         * リセット
         */
        reset() {

            this.gameData.statistics = {};

            this.initialize();
        }

    }

    window.StatisticsManager = StatisticsManager;

})();