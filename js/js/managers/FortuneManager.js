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
         * @param {GameData} gameData
         * @param {FortuneData} fortuneData
         */
        constructor(gameData, fortuneData) {

            this.gameData = gameData;
            this.fortuneData = fortuneData;

            this.lastResult = null;
            this.history = [];
        }

        /**
         * おみくじを引く
         */
        draw() {

            const result = this.fortuneData.draw();

            this.lastResult = result;

            this.history.push({
                id: result.id,
                name: result.name,
                time: Date.now()
            });

            this.gameData.addStat("fortuneCount");

            this.applyReward(result);

            return result;
        }

        /**
         * おみくじ結果による報酬
         */
        applyReward(result) {

            switch (result.id) {

                case "daikichi":
                    this.gameData.addFaith(20);
                    break;

                case "chukichi":
                    this.gameData.addFaith(15);
                    break;

                case "shokichi":
                    this.gameData.addFaith(10);
                    break;

                case "kichi":
                    this.gameData.addFaith(8);
                    break;

                case "suekichi":
                    this.gameData.addFaith(5);
                    break;

                case "kyo":
                    this.gameData.addFaith(2);
                    break;
            }
        }

        /**
         * 最新結果
         */
        getLastResult() {

            return this.lastResult;
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
        getCount() {

            return this.history.length;
        }

        /**
         * 履歴削除
         */
        clearHistory() {

            this.history.length = 0;
        }

        /**
         * 指定結果回数
         * @param {string} id
         */
        getResultCount(id) {

            return this.history.filter(
                item => item.id === id
            ).length;
        }

        /**
         * 一度でも引いたか
         * @param {string} id
         */
        hasDrawn(id) {

            return this.getResultCount(id) > 0;
        }

        /**
         * リセット
         */
        reset() {

            this.lastResult = null;
            this.clearHistory();
        }

    }

    window.FortuneManager = FortuneManager;

})();