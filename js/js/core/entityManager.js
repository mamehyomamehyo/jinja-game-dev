/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/entityManager.js
 * エンティティ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class EntityManager {

        constructor() {

            this.entities = [];
        }

        /**
         * エンティティ追加
         * @param {Entity} entity
         */
        add(entity) {

            if (!entity) {
                return null;
            }

            this.entities.push(entity);

            this.sort();

            return entity;
        }

        /**
         * エンティティ削除
         * @param {Entity} entity
         */
        remove(entity) {

            const index = this.entities.indexOf(entity);

            if (index !== -1) {
                this.entities.splice(index, 1);
            }
        }

        /**
         * 全削除
         */
        clear() {

            this.entities.length = 0;
        }

        /**
         * 更新
         * @param {number} delta
         */
        update(delta) {

            for (const entity of this.entities) {

                if (!entity.active) {
                    continue;
                }

                if (typeof entity.update === "function") {
                    entity.update(delta);
                }

                if (typeof entity.move === "function") {
                    entity.move(delta);
                }
            }
        }

        /**
         * 描画
         * @param {Renderer} renderer
         */
        render(renderer) {

            for (const entity of this.entities) {

                if (!entity.visible) {
                    continue;
                }

                if (typeof entity.render === "function") {
                    entity.render(renderer);
                }
            }
        }

        /**
         * レイヤー順ソート
         */
        sort() {

            this.entities.sort((a, b) => a.layer - b.layer);
        }

        /**
         * タグ検索
         * @param {string} tag
         */
        findByTag(tag) {

            return this.entities.filter(
                entity => entity.tag === tag
            );
        }

        /**
         * 条件検索
         * @param {Function} callback
         */
        filter(callback) {

            return this.entities.filter(callback);
        }

        /**
         * 全取得
         */
        getAll() {

            return [...this.entities];
        }

        /**
         * 件数
         */
        count() {

            return this.entities.length;
        }

        /**
         * 存在確認
         */
        has(entity) {

            return this.entities.includes(entity);
        }

    }

    window.EntityManager = EntityManager;

})();