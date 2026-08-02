/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/PlayerManager.js
 * プレイヤー管理
 * ==========================================================
 */

(() => {
    "use strict";

    class PlayerManager {

        /**
         * @param {GameData} gameData
         */
        constructor(gameData) {

            this.gameData = gameData;

            this.reset();
        }

        /**
         * 初期化
         */
        reset() {

            this.player = {

                name: "プレイヤー",

                level: 1,
                exp: 0,

                faith: 0,

                money: 1000,

                prayerCount: 0,
                fortuneCount: 0,
                shrineCount: 0,

                playTime: 0
            };
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            this.player.playTime += delta;
        }

        /**
         * 所持金
         */
        getMoney() {

            return this.player.money;
        }

        /**
         * 所持金設定
         * @param {number} value
         */
        setMoney(value) {

            this.player.money =
                Math.max(0, Math.floor(value));
        }

        /**
         * 所持金加算
         * @param {number} value
         */
        addMoney(value) {

            this.setMoney(
                this.player.money + value
            );

            return this.player.money;
        }

        /**
         * 信仰値
         */
        getFaith() {

            return this.player.faith;
        }

        /**
         * 信仰値設定
         */
        setFaith(value) {

            this.player.faith =
                Math.max(0, Math.floor(value));
        }

        /**
         * 信仰値加算
         */
        addFaith(value) {

            this.setFaith(
                this.player.faith + value
            );

            return this.player.faith;
        }

        /**
         * レベル
         */
        getLevel() {

            return this.player.level;
        }

        /**
         * 経験値
         */
        getExp() {

            return this.player.exp;
        }

        /**
         * 経験値加算
         */
        addExp(value) {

            this.player.exp += Math.max(0, value);

            while (this.player.exp >= 100) {

                this.player.exp -= 100;
                this.player.level++;
            }

            return this.player.level;
        }

        /**
         * 参拝回数
         */
        getPrayerCount() {

            return this.player.prayerCount;
        }

        /**
         * 参拝回数加算
         */
        addPrayerCount(count = 1) {

            this.player.prayerCount += count;
        }

        /**
         * おみくじ回数
         */
        getFortuneCount() {

            return this.player.fortuneCount;
        }

        /**
         * おみくじ回数加算
         */
        addFortuneCount(count = 1) {

            this.player.fortuneCount += count;
        }

        /**
         * 参拝神社数
         */
        getShrineCount() {

            return this.player.shrineCount;
        }

        /**
         * 参拝神社数加算
         */
        addShrineCount(count = 1) {

            this.player.shrineCount += count;
        }

        /**
         * プレイ時間
         */
        getPlayTime() {

            return this.player.playTime;
        }

        /**
         * セーブ用データ取得
         */
        toJSON() {

            return {
                ...this.player
            };
        }

        /**
         * セーブデータ読込
         */
        fromJSON(data) {

            if (!data) {
                return;
            }

            this.player = {
                ...this.player,
                ...data
            };
        }

    }

    window.PlayerManager = PlayerManager;

})();