/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/PrefectureData.js
 * 都道府県マスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class PrefectureData {

        constructor() {

            this.prefectures = [];

            this.loadDefault();
        }

        /**
         * 初期データ読込
         */
        loadDefault() {

            this.prefectures = [

                { id: 1,  code: "hokkaido", name: "北海道", region: "北海道" },

                { id: 2,  code: "aomori",   name: "青森県", region: "東北" },
                { id: 3,  code: "iwate",    name: "岩手県", region: "東北" },
                { id: 4,  code: "miyagi",   name: "宮城県", region: "東北" },
                { id: 5,  code: "akita",    name: "秋田県", region: "東北" },
                { id: 6,  code: "yamagata", name: "山形県", region: "東北" },
                { id: 7,  code: "fukushima",name: "福島県", region: "東北" },

                { id: 8,  code: "ibaraki",  name: "茨城県", region: "関東" },
                { id: 9,  code: "tochigi",  name: "栃木県", region: "関東" },
                { id: 10, code: "gunma",    name: "群馬県", region: "関東" },
                { id: 11, code: "saitama",  name: "埼玉県", region: "関東" },
                { id: 12, code: "chiba",    name: "千葉県", region: "関東" },
                { id: 13, code: "tokyo",    name: "東京都", region: "関東" },
                { id: 14, code: "kanagawa", name: "神奈川県", region: "関東" },

                { id: 15, code: "niigata",  name: "新潟県", region: "中部" },
                { id: 16, code: "toyama",   name: "富山県", region: "中部" },
                { id: 17, code: "ishikawa", name: "石川県", region: "中部" },
                { id: 18, code: "fukui",    name: "福井県", region: "中部" },
                { id: 19, code: "yamanashi",name: "山梨県", region: "中部" },
                { id: 20, code: "nagano",   name: "長野県", region: "中部" },
                { id: 21, code: "gifu",     name: "岐阜県", region: "中部" },
                { id: 22, code: "shizuoka", name: "静岡県", region: "中部" },
                { id: 23, code: "aichi",    name: "愛知県", region: "中部" },

                { id: 24, code: "mie",      name: "三重県", region: "近畿" },
                { id: 25, code: "shiga",    name: "滋賀県", region: "近畿" },
                { id: 26, code: "kyoto",    name: "京都府", region: "近畿" },
                { id: 27, code: "osaka",    name: "大阪府", region: "近畿" },
                { id: 28, code: "hyogo",    name: "兵庫県", region: "近畿" },
                { id: 29, code: "nara",     name: "奈良県", region: "近畿" },
                { id: 30, code: "wakayama", name: "和歌山県", region: "近畿" },

                { id: 31, code: "tottori",  name: "鳥取県", region: "中国" },
                { id: 32, code: "shimane",  name: "島根県", region: "中国" },
                { id: 33, code: "okayama",  name: "岡山県", region: "中国" },
                { id: 34, code: "hiroshima",name: "広島県", region: "中国" },
                { id: 35, code: "yamaguchi",name: "山口県", region: "中国" },

                { id: 36, code: "tokushima",name: "徳島県", region: "四国" },
                { id: 37, code: "kagawa",   name: "香川県", region: "四国" },
                { id: 38, code: "ehime",    name: "愛媛県", region: "四国" },
                { id: 39, code: "kochi",    name: "高知県", region: "四国" },

                { id: 40, code: "fukuoka",  name: "福岡県", region: "九州" },
                { id: 41, code: "saga",     name: "佐賀県", region: "九州" },
                { id: 42, code: "nagasaki", name: "長崎県", region: "九州" },
                { id: 43, code: "kumamoto", name: "熊本県", region: "九州" },
                { id: 44, code: "oita",     name: "大分県", region: "九州" },
                { id: 45, code: "miyazaki", name: "宮崎県", region: "九州" },
                { id: 46, code: "kagoshima",name: "鹿児島県", region: "九州" },
                { id: 47, code: "okinawa",  name: "沖縄県", region: "沖縄" }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.prefectures];
        }

        /**
         * ID取得
         */
        get(id) {

            return this.prefectures.find(
                prefecture => prefecture.id === id
            ) || null;
        }

        /**
         * コード取得
         */
        getByCode(code) {

            return this.prefectures.find(
                prefecture => prefecture.code === code
            ) || null;
        }

        /**
         * 名称取得
         */
        getByName(name) {

            return this.prefectures.find(
                prefecture => prefecture.name === name
            ) || null;
        }

        /**
         * 地方別取得
         */
        getByRegion(region) {

            return this.prefectures.filter(
                prefecture => prefecture.region === region
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

    window.PrefectureData = PrefectureData;

})();