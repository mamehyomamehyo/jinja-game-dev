/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/data/DeityData.js
 * 祭神マスターデータ
 * ==========================================================
 */

(() => {
    "use strict";

    class DeityData {

        constructor() {

            this.deities = [];

            this.loadDefault();
        }

        /**
         * 初期データ読込
         */
        loadDefault() {

            this.deities = [

                {
                    id: "amaterasu",
                    name: "天照大御神",
                    reading: "あまてらすおおみかみ",
                    category: "天津神",
                    description: "皇室の祖神とされる日本最高神。太陽を司る神。",
                    domains: [
                        "国家",
                        "平和",
                        "開運",
                        "繁栄"
                    ]
                },

                {
                    id: "toyouke",
                    name: "豊受大御神",
                    reading: "とようけのおおみかみ",
                    category: "天津神",
                    description: "衣食住と産業を司る神。",
                    domains: [
                        "食",
                        "産業",
                        "商売繁盛",
                        "五穀豊穣"
                    ]
                },

                {
                    id: "susanoo",
                    name: "素戔嗚尊",
                    reading: "すさのおのみこと",
                    category: "天津神",
                    description: "厄除けや疫病除けで広く信仰される神。",
                    domains: [
                        "厄除け",
                        "災難除け",
                        "勇気",
                        "開拓"
                    ]
                },

                {
                    id: "okuninushi",
                    name: "大国主大神",
                    reading: "おおくにぬしのおおかみ",
                    category: "国津神",
                    description: "縁結びと国造りで知られる神。",
                    domains: [
                        "縁結び",
                        "医療",
                        "国造り",
                        "商売繁盛"
                    ]
                },

                {
                    id: "hachiman",
                    name: "応神天皇",
                    reading: "おうじんてんのう",
                    category: "神格化された人物",
                    description: "八幡神として武運・国家守護の神格を持つ。",
                    domains: [
                        "武運",
                        "勝負運",
                        "国家守護"
                    ]
                },

                {
                    id: "tenjin",
                    name: "菅原道真公",
                    reading: "すがわらのみちざねこう",
                    category: "神格化された人物",
                    description: "学問・文化・至誠の神。",
                    domains: [
                        "学業成就",
                        "受験",
                        "芸能",
                        "文化"
                    ]
                },

                {
                    id: "inari",
                    name: "宇迦之御魂神",
                    reading: "うかのみたまのかみ",
                    category: "神",
                    description: "稲荷神として農業・商業を守護する神。",
                    domains: [
                        "五穀豊穣",
                        "商売繁盛",
                        "家内安全"
                    ]
                },

                {
                    id: "konohanasakuya",
                    name: "木花咲耶姫命",
                    reading: "このはなさくやひめのみこと",
                    category: "神",
                    description: "富士山の神。安産・子育ての守護神。",
                    domains: [
                        "安産",
                        "子育て",
                        "美",
                        "繁栄"
                    ]
                },

                {
                    id: "sarutahiko",
                    name: "猿田彦大神",
                    reading: "さるたひこのおおかみ",
                    category: "神",
                    description: "道開き・交通安全の神。",
                    domains: [
                        "道開き",
                        "交通安全",
                        "旅行",
                        "開運"
                    ]
                },

                {
                    id: "takemikazuchi",
                    name: "武甕槌大神",
                    reading: "たけみかづちのおおかみ",
                    category: "神",
                    description: "武道・勝負・決断を司る神。",
                    domains: [
                        "武道",
                        "勝負運",
                        "決断力"
                    ]
                }

            ];
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.deities];
        }

        /**
         * ID検索
         */
        get(id) {

            return this.deities.find(
                deity => deity.id === id
            ) || null;
        }

        /**
         * 名称検索
         */
        getByName(name) {

            return this.deities.find(
                deity => deity.name === name
            ) || null;
        }

        /**
         * 分類検索
         */
        getByCategory(category) {

            return this.deities.filter(
                deity => deity.category === category
            );
        }

        /**
         * ご利益検索
         */
        getByDomain(domain) {

            return this.deities.filter(
                deity => deity.domains.includes(domain)
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

    window.DeityData = DeityData;

})();