/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/MapData.js
 * マップ・地域・神社配置データ
 * ==========================================================
 */

(() => {
    "use strict";

    class MapData {

        constructor() {

            this.maps = [];

            this.loadDefault();
        }

        /**
         * 初期データ読込
         */
        loadDefault() {

            this.maps = [

                {
                    id: "hokkaido",
                    name: "北海道",
                    region: "北海道",

                    position: {
                        x: 700,
                        y: 80
                    },

                    shrines: []
                },

                {
                    id: "tohoku",
                    name: "東北",
                    region: "東北",

                    position: {
                        x: 660,
                        y: 180
                    },

                    shrines: []
                },

                {
                    id: "kanto",
                    name: "関東",
                    region: "関東",

                    position: {
                        x: 640,
                        y: 310
                    },

                    shrines: [
                        "meiji",
                        "kashima",
                        "tsurugaoka"
                    ]
                },

                {
                    id: "chubu",
                    name: "中部",
                    region: "中部",

                    position: {
                        x: 520,
                        y: 320
                    },

                    shrines: [
                        "atsuta"
                    ]
                },

                {
                    id: "kinki",
                    name: "近畿",
                    region: "近畿",

                    position: {
                        x: 410,
                        y: 360
                    },

                    shrines: [
                        "fushimi",
                        "ise_naiku"
                    ]
                },

                {
                    id: "chugoku",
                    name: "中国",
                    region: "中国",

                    position: {
                        x: 280,
                        y: 360
                    },

                    shrines: [
                        "izumo"
                    ]
                },

                {
                    id: "shikoku",
                    name: "四国",
                    region: "四国",

                    position: {
                        x: 350,
                        y: 470
                    },

                    shrines: []
                },

                {
                    id: "kyushu",
                    name: "九州",

                    region: "九州",

                    position: {
                        x: 170,
                        y: 470
                    },

                    shrines: [
                        "dazaifu"
                    ]
                },

                {
                    id: "okinawa",
                    name: "沖縄",

                    region: "沖縄",

                    position: {
                        x: 80,
                        y: 620
                    },

                    shrines: []
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.maps];
        }

        /**
         * ID取得
         */
        get(id) {

            return this.maps.find(
                map => map.id === id
            ) || null;
        }

        /**
         * 地方名取得
         */
        getByRegion(region) {

            return this.maps.find(
                map => map.region === region
            ) || null;
        }

        /**
         * 神社IDから検索
         */
        getByShrineId(shrineId) {

            return this.maps.find(
                map => map.shrines.includes(shrineId)
            ) || null;
        }

        /**
         * 神社追加
         */
        addShrine(mapId, shrineId) {

            const map = this.get(mapId);

            if (!map) {
                return false;
            }

            if (!map.shrines.includes(shrineId)) {

                map.shrines.push(shrineId);
            }

            return true;
        }

        /**
         * 神社一覧取得
         */
        getShrines(mapId) {

            const map = this.get(mapId);

            if (!map) {
                return [];
            }

            return [...map.shrines];
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

    window.MapData = MapData;

})();