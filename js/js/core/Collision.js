/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/Collision.js
 * 当たり判定ユーティリティ
 * ==========================================================
 */

(() => {
    "use strict";

    class Collision {

        /**
         * 点と矩形
         * @param {number} px
         * @param {number} py
         * @param {number} rx
         * @param {number} ry
         * @param {number} rw
         * @param {number} rh
         */
        static pointInRect(px, py, rx, ry, rw, rh) {

            return (
                px >= rx &&
                px <= rx + rw &&
                py >= ry &&
                py <= ry + rh
            );
        }

        /**
         * 点と円
         * @param {number} px
         * @param {number} py
         * @param {number} cx
         * @param {number} cy
         * @param {number} radius
         */
        static pointInCircle(px, py, cx, cy, radius) {

            const dx = px - cx;
            const dy = py - cy;

            return dx * dx + dy * dy <= radius * radius;
        }

        /**
         * 矩形と矩形
         */
        static rectIntersectsRect(
            ax,
            ay,
            aw,
            ah,
            bx,
            by,
            bw,
            bh
        ) {

            return !(
                ax + aw < bx ||
                bx + bw < ax ||
                ay + ah < by ||
                by + bh < ay
            );
        }

        /**
         * 円と円
         */
        static circleIntersectsCircle(
            ax,
            ay,
            ar,
            bx,
            by,
            br
        ) {

            const dx = ax - bx;
            const dy = ay - by;

            const distanceSq =
                dx * dx + dy * dy;

            const radius =
                ar + br;

            return distanceSq <= radius * radius;
        }

        /**
         * 円と矩形
         */
        static circleIntersectsRect(
            cx,
            cy,
            radius,
            rx,
            ry,
            rw,
            rh
        ) {

            const nearestX =
                Math.max(
                    rx,
                    Math.min(cx, rx + rw)
                );

            const nearestY =
                Math.max(
                    ry,
                    Math.min(cy, ry + rh)
                );

            const dx = cx - nearestX;
            const dy = cy - nearestY;

            return (
                dx * dx + dy * dy <=
                radius * radius
            );
        }

        /**
         * 点と線分
         */
        static pointOnLine(
            px,
            py,
            x1,
            y1,
            x2,
            y2,
            tolerance = 0.001
        ) {

            const length =
                Math.hypot(
                    x2 - x1,
                    y2 - y1
                );

            const d1 =
                Math.hypot(
                    px - x1,
                    py - y1
                );

            const d2 =
                Math.hypot(
                    px - x2,
                    py - y2
                );

            return Math.abs(
                (d1 + d2) - length
            ) <= tolerance;
        }

        /**
         * 距離
         */
        static distance(
            x1,
            y1,
            x2,
            y2
        ) {

            return Math.hypot(
                x2 - x1,
                y2 - y1
            );
        }

        /**
         * 距離の二乗
         */
        static distanceSquared(
            x1,
            y1,
            x2,
            y2
        ) {

            const dx = x2 - x1;
            const dy = y2 - y1;

            return dx * dx + dy * dy;
        }

        /**
         * AABB生成
         * @param {Object} object
         */
        static getBounds(object) {

            return {
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height
            };
        }

    }

    window.Collision = Collision;

})();