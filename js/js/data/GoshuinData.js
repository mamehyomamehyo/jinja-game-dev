/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/GoshuinData.js
 * 御朱印マスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class GoshuinData {

        constructor() {

            this.goshuinList = [];

            this.loadDefault();
        }

        /**
         * 初期データ読込
         */
        loadDefault() {

            this.goshuinList = [

                {
                    id: "ise_naiku",
                    shrineId: "ise_naiku",
                    name: "皇大神宮 御朱印",
                    prefecture: "三重県",
                    deity: "amaterasu",
                    description: "皇大神宮（内宮）の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SSR"
                },

                {
                    id: "izumo",
                    shrineId: "izumo",
                    name: "出雲大社 御朱印",
                    prefecture: "島根県",
                    deity: "okuninushi",
                    description: "出雲大社の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SSR"
                },

                {
                    id: "atsuta",
                    shrineId: "atsuta",
                    name: "熱田神宮 御朱印",
                    prefecture: "愛知県",
                    deity: "atsuta",
                    description: "熱田神宮の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SR"
                },

                {
                    id: "meiji",
                    shrineId: "meiji",
                    name: "明治神宮 御朱印",
                    prefecture: "東京都",
                    deity: "meiji",
                    description: "明治神宮の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SR"
                },

                {
                    id: "kashima",
                    shrineId: "kashima",
                    name: "鹿島神宮 御朱印",
                    prefecture: "茨城県",
                    deity: "takemikazuchi",
                    description: "鹿島神宮の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SR"
                },

                {
                    id: "tsurugaoka",
                    shrineId: "tsurugaoka",
                    name: "鶴岡八幡宮 御朱印",
                    prefecture: "神奈川県",
                    deity: "hachiman",
                    description: "鶴岡八幡宮の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "R"
                },

                {
                    id: "dazaifu",
                    shrineId: "dazaifu",
                    name: "太宰府天満宮 御朱印",
                    prefecture: "福岡県",
                    deity: "tenjin",
                    description: "太宰府天満宮の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SR"
                },

                {
                    id: "fushimi",
                    shrineId: "fushimi",
                    name: "伏見稲荷大社 御朱印",
                    prefecture: "京都府",
                    deity: "inari",
                    description: "伏見稲荷大社の御朱印。",
                    receiveCondition: {
                        visit: true
                    },
                    rarity: "SR"
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.goshuinList];
        }

        /**
         * ID取得
         */
        get(id) {

            return this.goshuinList.find(
                goshuin => goshuin.id === id
            ) || null;
        }

        /**
         * 神社ID取得
         */
        getByShrineId(shrineId) {

            return this.goshuinList.find(
                goshuin =>
                    goshuin.shrineId === shrineId
            ) || null;
        }

        /**
         * 都道府県検索
         */
        getByPrefecture(prefecture) {

            return this.goshuinList.filter(
                goshuin =>
                    goshuin.prefecture === prefecture
            );
        }

        /**
         * レアリティ検索
         */
        getByRarity(rarity) {

            return this.goshuinList.filter(
                goshuin =>
                    goshuin.rarity === rarity
            );
        }

        /**
         * 存在確認
         */
        has(id) {

            return this.get(id) !== null;
        }

        /**
         * リセット
         */
        reset() {

            this.loadDefault();
        }

    }

    window.GoshuinData = GoshuinData;

})();