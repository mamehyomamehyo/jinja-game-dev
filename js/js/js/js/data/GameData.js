/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/GameData.js
 * ゲームデータ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class GameData {

        constructor() {

            this.reset();
        }

        /**
         * 初期化
         */
        reset() {

            this.player = {
                name: "",
                level: 1,
                exp: 0,
                nextExp: 100
            };

            this.status = {
                money: 1000,
                faith: 0,
                reputation: 0
            };

            this.inventory = [];

            this.shrines = [];

            this.flags = {};

            this.statistics = {
                visitCount: 0,
                prayerCount: 0,
                fortuneCount: 0,
                purchaseCount: 0
            };
        }

        /**
         * 所持金追加
         */
        addMoney(value) {

            this.status.money += value;

            if (this.status.money < 0) {
                this.status.money = 0;
            }
        }

        /**
         * 所持金使用
         */
        spendMoney(value) {

            if (this.status.money < value) {
                return false;
            }

            this.status.money -= value;

            return true;
        }

        /**
         * 信仰追加
         */
        addFaith(value) {

            this.status.faith += value;

            if (this.status.faith < 0) {
                this.status.faith = 0;
            }
        }

        /**
         * アイテム追加
         */
        addItem(id, name, count = 1) {

            const item = this.inventory.find(
                item => item.id === id
            );

            if (item) {

                item.count += count;

                return;
            }

            this.inventory.push({
                id,
                name,
                count
            });
        }

        /**
         * アイテム削除
         */
        removeItem(id, count = 1) {

            const item = this.inventory.find(
                item => item.id === id
            );

            if (!item) {
                return false;
            }

            if (item.count < count) {
                return false;
            }

            item.count -= count;

            if (item.count <= 0) {

                this.inventory =
                    this.inventory.filter(
                        i => i.id !== id
                    );
            }

            return true;
        }

        /**
         * アイテム取得
         */
        getItem(id) {

            return this.inventory.find(
                item => item.id === id
            ) || null;
        }

        /**
         * 所持確認
         */
        hasItem(id) {

            return this.getItem(id) !== null;
        }

        /**
         * フラグ設定
         */
        setFlag(name, value = true) {

            this.flags[name] = value;
        }

        /**
         * フラグ取得
         */
        getFlag(name) {

            return !!this.flags[name];
        }

        /**
         * 統計加算
         */
        addStat(name, value = 1) {

            if (!(name in this.statistics)) {
                this.statistics[name] = 0;
            }

            this.statistics[name] += value;
        }

    }

    window.GameData = GameData;

})();