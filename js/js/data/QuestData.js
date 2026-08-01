/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/QuestData.js
 * クエストマスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class QuestData {

        constructor() {

            this.quests = [];

            this.loadDefault();
        }

        /**
         * 初期データ読込
         */
        loadDefault() {

            this.quests = [

                {
                    id: "first_prayer",
                    name: "はじめての参拝",
                    description: "神社で一度参拝する。",
                    category: "tutorial",

                    condition: {
                        prayerCount: 1
                    },

                    reward: {
                        money: 500,
                        faith: 10,
                        exp: 20
                    }
                },

                {
                    id: "first_fortune",
                    name: "運試し",
                    description: "おみくじを一度引く。",
                    category: "tutorial",

                    condition: {
                        fortuneCount: 1
                    },

                    reward: {
                        faith: 5,
                        exp: 15
                    }
                },

                {
                    id: "collector_5",
                    name: "御朱印集め",
                    description: "御朱印を5社集める。",
                    category: "collection",

                    condition: {
                        goshuinCount: 5
                    },

                    reward: {
                        money: 1000,
                        faith: 20,
                        exp: 50
                    }
                },

                {
                    id: "pilgrim_10",
                    name: "巡拝の旅",
                    description: "10回参拝する。",
                    category: "pilgrimage",

                    condition: {
                        prayerCount: 10
                    },

                    reward: {
                        money: 2000,
                        faith: 50,
                        exp: 100
                    }
                },

                {
                    id: "faithful",
                    name: "信仰の道",
                    description: "信仰値を100にする。",
                    category: "growth",

                    condition: {
                        faith: 100
                    },

                    reward: {
                        money: 3000,
                        faith: 0,
                        exp: 150
                    }
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.quests];
        }

        /**
         * ID検索
         */
        get(id) {

            return this.quests.find(
                quest => quest.id === id
            ) || null;
        }

        /**
         * カテゴリ検索
         */
        getByCategory(category) {

            return this.quests.filter(
                quest => quest.category === category
            );
        }

        /**
         * 存在確認
         */
        has(id) {

            return this.get(id) !== null;
        }

        /**
         * 追加
         */
        add(quest) {

            if (!quest || !quest.id) {
                return false;
            }

            if (this.has(quest.id)) {
                return false;
            }

            this.quests.push(quest);

            return true;
        }

        /**
         * 削除
         */
        remove(id) {

            const before = this.quests.length;

            this.quests = this.quests.filter(
                quest => quest.id !== id
            );

            return before !== this.quests.length;
        }

        /**
         * リセット
         */
        reset() {

            this.loadDefault();
        }

    }

    window.QuestData = QuestData;

})();