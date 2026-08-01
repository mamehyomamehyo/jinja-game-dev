/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/FortuneData.js
 * おみくじマスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class FortuneData {

        constructor() {

            this.fortunes = [];

            this.loadDefault();
        }

        /**
         * 初期データ
         */
        loadDefault() {

            this.fortunes = [

                {
                    id: "daikichi",
                    name: "大吉",
                    weight: 5,
                    color: "#d32f2f",
                    message: "願い事は叶いやすいでしょう。感謝の心を忘れずに。"
                },

                {
                    id: "chukichi",
                    name: "中吉",
                    weight: 12,
                    color: "#ef6c00",
                    message: "努力が実を結びます。焦らず歩みましょう。"
                },

                {
                    id: "shokichi",
                    name: "小吉",
                    weight: 20,
                    color: "#388e3c",
                    message: "穏やかな運勢です。日々の積み重ねを大切に。"
                },

                {
                    id: "kichi",
                    name: "吉",
                    weight: 28,
                    color: "#1976d2",
                    message: "良い流れがあります。素直な心を大切に。"
                },

                {
                    id: "suekichi",
                    name: "末吉",
                    weight: 25,
                    color: "#7b1fa2",
                    message: "今は準備の時です。焦らず力を蓄えましょう。"
                },

                {
                    id: "kyo",
                    name: "凶",
                    weight: 10,
                    color: "#555555",
                    message: "慎重な行動が吉。災いも学びへ変えられます。"
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.fortunes];
        }

        /**
         * ID検索
         */
        get(id) {

            return this.fortunes.find(
                fortune => fortune.id === id
            ) || null;
        }

        /**
         * 名前検索
         */
        getByName(name) {

            return this.fortunes.find(
                fortune => fortune.name === name
            ) || null;
        }

        /**
         * 重み付き抽選
         */
        draw() {

            const total = this.fortunes.reduce(
                (sum, fortune) => sum + fortune.weight,
                0
            );

            let value = Random.float(0, total);

            for (const fortune of this.fortunes) {

                value -= fortune.weight;

                if (value <= 0) {
                    return fortune;
                }
            }

            return this.fortunes[this.fortunes.length - 1];
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

    window.FortuneData = FortuneData;

})();