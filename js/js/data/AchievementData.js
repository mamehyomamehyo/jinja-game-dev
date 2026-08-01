/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/AchievementData.js
 * 実績マスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class AchievementData {

        constructor() {

            this.achievements = [];

            this.loadDefault();
        }

        /**
         * 初期データ読込
         */
        loadDefault() {

            this.achievements = [

                {
                    id: "first_prayer",
                    name: "はじめての参拝",
                    description: "初めて神社で参拝した。",
                    category: "tutorial",
                    hidden: false,

                    condition: {
                        prayerCount: 1
                    },

                    reward: {
                        faith: 10
                    }
                },

                {
                    id: "fortune_master",
                    name: "運勢占い",
                    description: "おみくじを10回引く。",
                    category: "fortune",
                    hidden: false,

                    condition: {
                        fortuneCount: 10
                    },

                    reward: {
                        money: 1000
                    }
                },

                {
                    id: "pilgrim",
                    name: "巡拝者",
                    description: "20回参拝する。",
                    category: "pilgrimage",
                    hidden: false,

                    condition: {
                        prayerCount: 20
                    },

                    reward: {
                        faith: 30
                    }
                },

                {
                    id: "collector",
                    name: "御朱印収集家",
                    description: "御朱印を10社集める。",
                    category: "collection",
                    hidden: false,

                    condition: {
                        goshuinCount: 10
                    },

                    reward: {
                        money: 3000,
                        faith: 20
                    }
                },

                {
                    id: "believer",
                    name: "篤き信仰",
                    description: "信仰値500を達成する。",
                    category: "growth",
                    hidden: true,

                    condition: {
                        faith: 500
                    },

                    reward: {
                        money: 5000
                    }
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.achievements];
        }

        /**
         * ID検索
         */
        get(id) {

            return this.achievements.find(
                achievement => achievement.id === id
            ) || null;
        }

        /**
         * カテゴリ検索
         */
        getByCategory(category) {

            return this.achievements.filter(
                achievement =>
                    achievement.category === category
            );
        }

        /**
         * 公開実績一覧
         */
        getVisible() {

            return this.achievements.filter(
                achievement => !achievement.hidden
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
        add(achievement) {

            if (!achievement || !achievement.id) {
                return false;
            }

            if (this.has(achievement.id)) {
                return false;
            }

            this.achievements.push(achievement);

            return true;
        }

        /**
         * 削除
         */
        remove(id) {

            const before = this.achievements.length;

            this.achievements =
                this.achievements.filter(
                    achievement =>
                        achievement.id !== id
                );

            return before !== this.achievements.length;
        }

        /**
         * リセット
         */
        reset() {

            this.loadDefault();
        }

    }

    window.AchievementData = AchievementData;

})();