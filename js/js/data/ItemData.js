/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/ItemData.js
 * アイテムマスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class ItemData {

        constructor() {

            this.items = [];

            this.loadDefault();
        }

        /**
         * 初期データ
         */
        loadDefault() {

            this.items = [

                {
                    id: "omamori_health",
                    name: "健康守",
                    category: "omamori",
                    price: 500,
                    stack: true,
                    description: "健康を祈願した御守。"
                },

                {
                    id: "omamori_luck",
                    name: "開運守",
                    category: "omamori",
                    price: 800,
                    stack: true,
                    description: "開運を願う御守。"
                },

                {
                    id: "omamori_success",
                    name: "学業守",
                    category: "omamori",
                    price: 700,
                    stack: true,
                    description: "学業成就を祈願した御守。"
                },

                {
                    id: "ema",
                    name: "絵馬",
                    category: "offering",
                    price: 300,
                    stack: true,
                    description: "願い事を書いて奉納する。"
                },

                {
                    id: "goshuin",
                    name: "御朱印",
                    category: "collection",
                    price: 500,
                    stack: true,
                    description: "参拝の証としていただく御朱印。"
                },

                {
                    id: "ofuda",
                    name: "御札",
                    category: "sacred",
                    price: 1000,
                    stack: false,
                    description: "神棚にお祀りする御札。"
                },

                {
                    id: "sake",
                    name: "御神酒",
                    category: "offering",
                    price: 600,
                    stack: true,
                    description: "神前へ供える御神酒。"
                },

                {
                    id: "rice",
                    name: "御供米",
                    category: "offering",
                    price: 400,
                    stack: true,
                    description: "神前へ供えるお米。"
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.items];
        }

        /**
         * ID検索
         */
        get(id) {

            return this.items.find(
                item => item.id === id
            ) || null;
        }

        /**
         * カテゴリ検索
         */
        getByCategory(category) {

            return this.items.filter(
                item => item.category === category
            );
        }

        /**
         * 存在確認
         */
        has(id) {

            return this.get(id) !== null;
        }

        /**
         * 価格取得
         */
        getPrice(id) {

            const item = this.get(id);

            return item ? item.price : 0;
        }

        /**
         * 名前取得
         */
        getName(id) {

            const item = this.get(id);

            return item ? item.name : "";
        }

        /**
         * 説明取得
         */
        getDescription(id) {

            const item = this.get(id);

            return item ? item.description : "";
        }

        /**
         * リセット
         */
        reset() {

            this.loadDefault();
        }

    }

    window.ItemData = ItemData;

})();