/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/SaveManager.js
 * ゲームセーブ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class GameSaveManager {

        /**
         * @param {SaveManager} saveCore
         * @param {GameData} gameData
         * @param {ShrineData} shrineData
         */
        constructor(saveCore, gameData, shrineData) {

            this.saveCore = saveCore;
            this.gameData = gameData;
            this.shrineData = shrineData;
        }

        /**
         * セーブ
         */
        save() {

            const data = {

                version: CONFIG.VERSION,

                gameData: Utils.clone(this.gameData),

                shrineData: Utils.clone(
                    this.shrineData.getAll()
                )
            };

            return this.saveCore.save(data);
        }

        /**
         * ロード
         */
        load() {

            const data = this.saveCore.load();

            if (!data) {
                return false;
            }

            if (data.gameData) {

                Object.assign(
                    this.gameData,
                    Utils.clone(data.gameData)
                );
            }

            if (
                data.shrineData &&
                Array.isArray(data.shrineData)
            ) {

                this.shrineData.shrines =
                    Utils.clone(data.shrineData);
            }

            return true;
        }

        /**
         * 新規ゲーム
         */
        newGame() {

            this.gameData.reset();
            this.shrineData.reset();

            this.save();
        }

        /**
         * オートセーブ
         */
        autoSave() {

            return this.save();
        }

        /**
         * セーブ削除
         */
        deleteSave() {

            this.saveCore.clear();
        }

        /**
         * セーブ存在確認
         */
        exists() {

            return this.saveCore.exists();
        }

        /**
         * エクスポート
         */
        export() {

            return JSON.stringify({

                version: CONFIG.VERSION,

                gameData: Utils.clone(this.gameData),

                shrineData: Utils.clone(
                    this.shrineData.getAll()
                )

            });
        }

        /**
         * インポート
         */
        import(json) {

            try {

                const data = JSON.parse(json);

                if (data.gameData) {

                    Object.assign(
                        this.gameData,
                        Utils.clone(data.gameData)
                    );
                }

                if (Array.isArray(data.shrineData)) {

                    this.shrineData.shrines =
                        Utils.clone(data.shrineData);
                }

                return this.save();

            } catch (e) {

                console.error(e);

                return false;
            }
        }

    }

    window.GameSaveManager = GameSaveManager;

})();