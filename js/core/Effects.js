/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/Effects.js
 * エフェクト管理
 * ==========================================================
 */

(() => {
    "use strict";

    class Effects {

        constructor() {

            this.effects = [];
            this.nextId = 1;
        }

        /**
         * エフェクト追加
         * @param {Object} effect
         */
        add(effect) {

            effect.id = this.nextId++;

            effect.x = effect.x ?? 0;
            effect.y = effect.y ?? 0;

            effect.life = effect.life ?? 1;
            effect.maxLife = effect.life;

            effect.alpha = effect.alpha ?? 1;
            effect.scale = effect.scale ?? 1;
            effect.rotation = effect.rotation ?? 0;

            effect.vx = effect.vx ?? 0;
            effect.vy = effect.vy ?? 0;

            effect.update =
                effect.update ??
                this.defaultUpdate;

            effect.render =
                effect.render ??
                this.defaultRender;

            this.effects.push(effect);

            return effect.id;
        }

        /**
         * 更新
         * @param {number} delta
         * @param {Renderer} renderer
         */
        update(delta, renderer) {

            for (let i = this.effects.length - 1; i >= 0; i--) {

                const effect = this.effects[i];

                effect.life -= delta;

                effect.update(effect, delta, renderer);

                if (effect.life <= 0) {

                    this.effects.splice(i, 1);
                }
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            for (const effect of this.effects) {

                effect.render(effect, renderer);
            }
        }

        /**
         * 標準更新
         */
        defaultUpdate(effect, delta) {

            effect.x += effect.vx * delta;
            effect.y += effect.vy * delta;

            effect.alpha = Math.max(
                0,
                effect.life / effect.maxLife
            );
        }

        /**
         * 標準描画
         */
        defaultRender(effect, renderer) {

            renderer.save();

            renderer.alpha(effect.alpha);

            renderer.circle(
                effect.x,
                effect.y,
                6 * effect.scale,
                "#ffffff"
            );

            renderer.restore();
        }

        /**
         * 全削除
         */
        clear() {

            this.effects.length = 0;
        }

        /**
         * エフェクト数
         */
        count() {

            return this.effects.length;
        }

        /**
         * 存在確認
         */
        isEmpty() {

            return this.effects.length === 0;
        }

        /**
         * リセット
         */
        reset() {

            this.clear();

            this.nextId = 1;
        }

    }

    window.Effects = Effects;

})();