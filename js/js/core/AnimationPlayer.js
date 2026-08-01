/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/AnimationPlayer.js
 * 汎用アニメーション管理
 * ==========================================================
 */

(() => {
    "use strict";

    class AnimationPlayer {

        constructor() {

            this.animations = [];
            this.nextId = 1;
            this.paused = false;
        }

        /**
         * アニメーション追加
         * @param {Object} target
         * @param {Object} properties
         * @param {number} duration
         * @param {Function|null} onComplete
         */
        play(
            target,
            properties,
            duration,
            onComplete = null
        ) {

            const animation = {

                id: this.nextId++,

                target,

                duration: Math.max(0.001, duration),
                elapsed: 0,

                start: {},
                end: {},

                onComplete
            };

            for (const key in properties) {

                animation.start[key] =
                    Number(target[key] ?? 0);

                animation.end[key] =
                    Number(properties[key]);
            }

            this.animations.push(animation);

            return animation.id;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            if (this.paused) {
                return;
            }

            for (let i = this.animations.length - 1; i >= 0; i--) {

                const animation = this.animations[i];

                animation.elapsed += delta;

                const t = Math.min(
                    animation.elapsed / animation.duration,
                    1
                );

                for (const key in animation.end) {

                    const start = animation.start[key];
                    const end = animation.end[key];

                    animation.target[key] =
                        start + (end - start) * t;
                }

                if (t >= 1) {

                    if (typeof animation.onComplete === "function") {

                        animation.onComplete(animation.target);
                    }

                    this.animations.splice(i, 1);
                }
            }
        }

        /**
         * 指定アニメーション停止
         * @param {number} id
         */
        stop(id) {

            const index = this.animations.findIndex(
                animation => animation.id === id
            );

            if (index === -1) {
                return false;
            }

            this.animations.splice(index, 1);

            return true;
        }

        /**
         * 全停止
         */
        stopAll() {

            this.animations.length = 0;
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
         * 一時停止中判定
         */
        isPaused() {

            return this.paused;
        }

        /**
         * 実行中アニメーション数
         */
        count() {

            return this.animations.length;
        }

        /**
         * 実行中判定
         */
        isPlaying() {

            return this.animations.length > 0;
        }

        /**
         * リセット
         */
        reset() {

            this.stopAll();

            this.paused = false;
        }

    }

    window.AnimationPlayer = AnimationPlayer;

})();