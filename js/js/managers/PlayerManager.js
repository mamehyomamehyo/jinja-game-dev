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
        }

        /**
         * プレイヤー情報
         */
        getPlayer() {

            return this.gameData.player;
        }

        /**
         * 名前
         */
        getName() {

            return this.gameData.player.name;
        }

        setName(name) {

            this.gameData.player.name = String(name).trim();
        }

        /**
         * レベル
         */
        getLevel() {

            return this.gameData.player.level;
        }

        /**
         * 経験値
         */
        getExp() {

            return this.gameData.player.exp;
        }

        /**
         * 次レベル必要経験値
         */
        getNextExp() {

            return this.gameData.player.nextExp;
        }

        /**
         * 経験値追加
         * @returns {number} レベルアップ回数
         */
        addExp(value) {

            const player = this.gameData.player;

            player.exp += Math.max(0, value);

            let levelUpCount = 0;

            while (player.exp >= player.nextExp) {

                player.exp -= player.nextExp;
                player.level++;

                levelUpCount++;

                // 必要経験値を25%ずつ増加
                player.nextExp = Math.floor(
                    player.nextExp * 1.25
                );
            }

            return levelUpCount;
        }

        /**
         * レベル設定
         */
        setLevel(level) {

            this.gameData.player.level =
                Math.max(1, Math.floor(level));
        }

        /**
         * 信仰値
         */
        getFaith() {

            return this.gameData.status.faith;
        }

        /**
         * 信仰値追加
         */
        addFaith(value) {

            this.gameData.addFaith(value);
        }

        /**
         * 所持金
         */
        getMoney() {

            return this.gameData.status.money;
        }

        /**
         * 所持金追加
         */
        addMoney(value) {

            this.gameData.addMoney(value);
        }

        /**
         * 所持金使用
         */
        spendMoney(value) {

            return this.gameData.spendMoney(value);
        }

        /**
         * 評判
         */
        getReputation() {

            return this.gameData.status.reputation;
        }

        /**
         * 評判追加
         */
        addReputation(value) {

            this.gameData.status.reputation += value;

            if (this.gameData.status.reputation < 0) {
                this.gameData.status.reputation = 0;
            }
        }

        /**
         * プレイヤー初期化
         */
        reset() {

            this.gameData.player = {
                name: "",
                level: 1,
                exp: 0,
                nextExp: 100
            };

            this.gameData.status = {
                money: 1000,
                faith: 0,
                reputation: 0
            };
        }

    }

    window.PlayerManager = PlayerManager;

})();