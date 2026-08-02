/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/managers/SaveManager.js
 * セーブデータ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class SaveManager {

        /**
         * @param {Object} managers
         */
        constructor(managers = {}) {

            this.managers = managers;

            this.storageKey = "shrine_game_save";

            this.version = "1.0.0";
        }

        /**
         * マネージャ登録
         * @param {string} name
         * @param {Object} manager
         */
        register(name, manager) {

            this.managers[name] = manager;
        }

        /**
         * セーブ
         */
        save() {

            try {

                const saveData = {

                    version: this.version,

                    savedAt: Date.now(),

                    data: {}
                };

                for (const [name, manager] of Object.entries(this.managers)) {

                    if (
                        manager &&
                        typeof manager.toJSON === "function"
                    ) {

                        saveData.data[name] = manager.toJSON();
                    }
                }

                localStorage.setItem(
                    this.storageKey,
                    JSON.stringify(saveData)
                );

                return true;

            } catch (error) {

                console.error(
                    "[SaveManager] Save Error",
                    error
                );

                return false;
            }
        }

        /**
         * ロード
         */
        load() {

            try {

                const json = localStorage.getItem(
                    this.storageKey
                );

                if (!json) {
                    return false;
                }

                const saveData = JSON.parse(json);

                if (!saveData.data) {
                    return false;
                }

                for (const [name, manager] of Object.entries(this.managers)) {

                    if (
                        manager &&
                        typeof manager.fromJSON === "function"
                    ) {

                        manager.fromJSON(
                            saveData.data[name]
                        );
                    }
                }

                return true;

            } catch (error) {

                console.error(
                    "[SaveManager] Load Error",
                    error
                );

                return false;
            }
        }

        /**
         * セーブデータ削除
         */
        deleteSave() {

            localStorage.removeItem(
                this.storageKey
            );
        }

        /**
         * セーブデータ存在確認
         */
        hasSave() {

            return (
                localStorage.getItem(
                    this.storageKey
                ) !== null
            );
        }

        /**
         * オートセーブ
         */
        autoSave() {

            return this.save();
        }

        /**
         * エクスポート
         */
        export() {

            const json = localStorage.getItem(
                this.storageKey
            );

            return json ?? "";
        }

        /**
         * インポート
         * @param {string} json
         */
        import(json) {

            try {

                JSON.parse(json);

                localStorage.setItem(
                    this.storageKey,
                    json
                );

                return this.load();

            } catch (error) {

                console.error(
                    "[SaveManager] Import Error",
                    error
                );

                return false;
            }
        }

        /**
         * 保存日時取得
         */
        getLastSavedAt() {

            const json = localStorage.getItem(
                this.storageKey
            );

            if (!json) {
                return null;
            }

            try {

                const data = JSON.parse(json);

                return data.savedAt ?? null;

            } catch {

                return null;
            }
        }

    }

    window.SaveManager = SaveManager;

})();