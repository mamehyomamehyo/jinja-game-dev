/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/TaskScheduler.js
 * タスクスケジューラ
 * ==========================================================
 */

(() => {
    "use strict";

    class TaskScheduler {

        constructor() {

            this.tasks = [];
            this.nextId = 1;
            this.paused = false;
        }

        /**
         * 一度だけ実行
         * @param {Function} callback
         * @param {number} delay
         */
        once(callback, delay) {

            return this.add(callback, delay, false);
        }

        /**
         * 繰り返し実行
         * @param {Function} callback
         * @param {number} interval
         */
        repeat(callback, interval) {

            return this.add(callback, interval, true);
        }

        /**
         * タスク追加
         * @param {Function} callback
         * @param {number} time
         * @param {boolean} repeat
         */
        add(callback, time, repeat) {

            const task = {

                id: this.nextId++,

                callback,

                interval: Math.max(0, time),
                remaining: Math.max(0, time),

                repeat,

                enabled: true
            };

            this.tasks.push(task);

            return task.id;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (this.paused) {
                return;
            }

            for (let i = this.tasks.length - 1; i >= 0; i--) {

                const task = this.tasks[i];

                if (!task.enabled) {
                    continue;
                }

                task.remaining -= delta;

                if (task.remaining > 0) {
                    continue;
                }

                if (typeof task.callback === "function") {
                    task.callback(task);
                }

                if (task.repeat) {

                    task.remaining += task.interval;

                } else {

                    this.tasks.splice(i, 1);
                }
            }
        }

        /**
         * タスク削除
         * @param {number} id
         */
        remove(id) {

            const index = this.tasks.findIndex(
                task => task.id === id
            );

            if (index === -1) {
                return false;
            }

            this.tasks.splice(index, 1);

            return true;
        }

        /**
         * 全削除
         */
        clear() {

            this.tasks.length = 0;
        }

        /**
         * 一時停止
         */
        pause() {

            this.paused = true;
        }

        /**
         * 再開
         */
        resume() {

            this.paused = false;
        }

        /**
         * 一時停止中
         */
        isPaused() {

            return this.paused;
        }

        /**
         * タスク数
         */
        count() {

            return this.tasks.length;
        }

    }

    window.TaskScheduler = TaskScheduler;

})();