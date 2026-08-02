/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/FortuneManager.js
 * おみくじ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class FortuneManager {

        /**
         * @param {FortuneData} fortuneData
         * @param {PlayerManager} playerManager
         */
        constructor(
            fortuneData,
            playerManager
        ) {

            this.fortuneData = fortuneData;
            this.playerManager = playerManager;

            this.history = [];
            this.lastFortune = null;
        }

        /**
         * おみくじを引く
         */
        draw() {

            const fortunes = this.getAll();

            if (fortunes.length === 0) {

                return {
                    rank: "吉",
                    message: "穏やかな一日になりそうです。",
                    blessing: "感謝の心を大切にしましょう。"
                };
            }

            const index =
                Math.floor(
                    Math.random() * fortunes.length
                );

            const result = {
                ...fortunes[index],
                drawnAt: Date.now()
            };

            this.lastFortune = result;

            this.history.push(result);

            if (this.playerManager) {

                this.playerManager.addFortuneCount();

                this.playerManager.addFaith(1);
            }

            if (
                window.app &&
                window.app.notificationManager
            ) {

                window.app.notificationManager.add(
                    `おみくじ結果：${result.rank}`,
                    "success",
                    3
                );
            }

            return result;
        }

        /**
         * 全取得
         */
        getAll() {

            if (
                this.fortuneData &&
                typeof this.fortuneData.getAll === "function"
            ) {

                return this.fortuneData.getAll();
            }

            return [];
        }

        /**
         * 前回結果
         */
        getLastFortune() {

            return this.lastFortune;
        }

        /**
         * 履歴取得
         */
        getHistory() {

            return [...this.history];
        }

        /**
         * 履歴件数
         */
        countHistory() {

            return this.history.length;
        }

        /**
         * 履歴削除
         */
        clearHistory() {

            this.history = [];
            this.lastFortune = null;
        }

        /**
         * セーブデータ
         */
        toJSON() {

            return {

                history: this.history,

                lastFortune: this.lastFortune
            };
        }

        /**
         * ロード
         * @param {Object} data
         */
        fromJSON(data) {

            if (!data) {
                return;
            }

            this.history =
                data.history ?? [];

            this.lastFortune =
                data.lastFortune ?? null;
        }

    }

    window.FortuneManager = FortuneManager;

})();