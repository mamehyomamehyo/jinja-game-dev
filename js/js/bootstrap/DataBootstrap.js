/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/bootstrap/DataBootstrap.js
 * データ初期化
 * ==========================================================
 */

(() => {
    "use strict";

    class DataBootstrap {

        /**
         * データ初期化
         * @param {App} app
         */
        static initialize(app) {

            if (!app) {

                throw new Error(
                    "DataBootstrap: App が指定されていません。"
                );
            }

            /*
             * ==================================================
             * 基本データ
             * ==================================================
             */

            app.gameData =
                new GameData();

            app.shrineData =
                new ShrineData();

            app.itemData =
                new ItemData();

            app.fortuneData =
                new FortuneData();

            app.eventData =
                new EventData();

            /*
             * ==================================================
             * ゲームデータ
             * ==================================================
             */

            app.questData =
                new QuestData();

            app.achievementData =
                new AchievementData();

            app.prefectureData =
                new PrefectureData();

            app.deityData =
                new DeityData();

            app.goshuinData =
                new GoshuinData();

            app.mapData =
                new MapData();

            /*
             * ==================================================
             * データ一覧
             * ==================================================
             */

            app.data = {

                game: app.gameData,

                shrine: app.shrineData,

                item: app.itemData,

                fortune: app.fortuneData,

                event: app.eventData,

                quest: app.questData,

                achievement:
                    app.achievementData,

                prefecture:
                    app.prefectureData,

                deity:
                    app.deityData,

                goshuin:
                    app.goshuinData,

                map:
                    app.mapData
            };
        }

        /**
         * 全データ取得
         * @param {App} app
         */
        static getAll(app) {

            return app.data;
        }

        /**
         * データ取得
         * @param {App} app
         * @param {string} name
         */
        static get(app, name) {

            if (
                !app ||
                !app.data
            ) {

                return null;
            }

            return app.data[name] ?? null;
        }

    }

    window.DataBootstrap =
        DataBootstrap;

})();