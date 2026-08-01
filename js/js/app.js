/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/app.js
 * アプリケーションエントリーポイント
 * ==========================================================
 */

(() => {
    "use strict";

    class App {

        constructor() {

            this.game = new Game();

            this.initializeManagers();
            this.initializeScenes();

            window.app = this;
        }

        /**
         * 各種マネージャ初期化
         */
        initializeManagers() {

            // Data
            this.gameData = new GameData();
            this.shrineData = new ShrineData();
            this.itemData = new ItemData();
            this.fortuneData = new FortuneData();
            this.eventData = new EventData();

            // Managers
            this.playerManager =
                new PlayerManager(this.gameData);

            this.inventoryManager =
                new InventoryManager(
                    this.gameData,
                    this.itemData
                );

            this.shopManager =
                new ShopManager(
                    this.gameData,
                    this.itemData,
                    this.inventoryManager
                );

            this.shrineManager =
                new ShrineManager(
                    this.gameData,
                    this.shrineData,
                    this.inventoryManager
                );

            this.prayerManager =
                new PrayerManager(
                    this.gameData,
                    this.shrineManager
                );

            this.fortuneManager =
                new FortuneManager(
                    this.gameData,
                    this.fortuneData
                );

            this.eventManager =
                new GameEventManager(
                    this.gameData,
                    this.eventData
                );

            this.achievementManager =
                new AchievementManager(
                    this.gameData,
                    this.eventData
                );

            this.questManager =
                new QuestManager(
                    this.gameData
                );

            this.goshuinManager =
                new GoshuinManager(
                    this.gameData,
                    this.shrineData
                );

            this.kamidanaManager =
                new KamidanaManager(
                    this.gameData,
                    this.inventoryManager
                );

            this.statisticsManager =
                new StatisticsManager(
                    this.gameData
                );

            this.notificationManager =
                new NotificationManager();

            this.saveManager =
                new GameSaveManager(
                    this.game.save,
                    this.gameData,
                    this.shrineData
                );
        }

        /**
         * シーン登録
         */
        initializeScenes() {

            const sceneManager =
                this.game.getSceneManager();

            sceneManager.add(
                "boot",
                new BootScene(this.game)
            );

            sceneManager.add(
                "title",
                new TitleScene(this.game)
            );

            sceneManager.add(
                "main",
                new MainScene(this.game)
            );

            sceneManager.add(
                "map",
                new MapScene(this.game)
            );

            sceneManager.add(
                "shrine",
                new ShrineScene(this.game)
            );

            sceneManager.add(
                "fortune",
                new FortuneScene(this.game)
            );

            sceneManager.add(
                "shop",
                new ShopScene(this.game)
            );

            sceneManager.add(
                "inventory",
                new InventoryScene(this.game)
            );

            sceneManager.change("boot");
        }

        /**
         * 起動
         */
        start() {

            this.game.start();
        }

    }

    window.App = App;

    window.addEventListener("load", () => {

        const app = new App();

        app.start();
    });

})();