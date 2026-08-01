/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/EventData.js
 * イベントマスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class EventData {

        constructor() {

            this.events = [];

            this.loadDefault();
        }

        /**
         * 初期データ
         */
        loadDefault() {

            this.events = [

                {
                    id: "first_prayer",
                    name: "初めての参拝",
                    type: "story",
                    once: true,
                    priority: 100,
                    condition: {
                        prayerCount: 1
                    },
                    reward: {
                        faith: 10
                    },
                    message:
                        "初めて神前に手を合わせました。静かな気持ちになります。"
                },

                {
                    id: "first_fortune",
                    name: "初めてのおみくじ",
                    type: "story",
                    once: true,
                    priority: 90,
                    condition: {
                        fortuneCount: 1
                    },
                    reward: {
                        faith: 5
                    },
                    message:
                        "初めておみくじを引きました。結果を胸に日々を過ごしましょう。"
                },

                {
                    id: "first_purchase",
                    name: "授与品とのご縁",
                    type: "story",
                    once: true,
                    priority: 80,
                    condition: {
                        purchaseCount: 1
                    },
                    reward: {
                        faith: 5
                    },
                    message:
                        "授与品を受け、神様とのご縁が深まりました。"
                },

                {
                    id: "faith_100",
                    name: "信仰の芽生え",
                    type: "achievement",
                    once: true,
                    priority: 70,
                    condition: {
                        faith: 100
                    },
                    reward: {
                        money: 1000
                    },
                    message:
                        "信仰心が少しずつ育ってきています。"
                },

                {
                    id: "visit_10",
                    name: "参拝の積み重ね",
                    type: "achievement",
                    once: true,
                    priority: 60,
                    condition: {
                        visitCount: 10
                    },
                    reward: {
                        faith: 20
                    },
                    message:
                        "継続した参拝が良いご縁へとつながっています。"
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.events];
        }

        /**
         * ID検索
         */
        get(id) {

            return this.events.find(
                event => event.id === id
            ) || null;
        }

        /**
         * 種別検索
         */
        getByType(type) {

            return this.events.filter(
                event => event.type === type
            );
        }

        /**
         * 優先度順取得
         */
        getSorted() {

            return [...this.events].sort(
                (a, b) => b.priority - a.priority
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

    window.EventData = EventData;

})();