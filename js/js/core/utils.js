/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/utils.js
 * 共通ユーティリティ
 * ==========================================================
 */

(() => {
    "use strict";

    class Utils {

        /**
         * 値を範囲内に収める
         */
        static clamp(value, min, max) {

            return Math.max(min, Math.min(max, value));
        }

        /**
         * 線形補間
         */
        static lerp(start, end, t) {

            return start + (end - start) * t;
        }

        /**
         * 指定範囲内か
         */
        static between(value, min, max) {

            return value >= min && value <= max;
        }

        /**
         * ラジアン変換
         */
        static toRad(degree) {

            return degree * Math.PI / 180;
        }

        /**
         * 度変換
         */
        static toDeg(radian) {

            return radian * 180 / Math.PI;
        }

        /**
         * 距離
         */
        static distance(x1, y1, x2, y2) {

            return Math.hypot(
                x2 - x1,
                y2 - y1
            );
        }

        /**
         * 2点間角度
         */
        static angle(x1, y1, x2, y2) {

            return Math.atan2(
                y2 - y1,
                x2 - x1
            );
        }

        /**
         * 範囲判定
         */
        static inRect(x, y, rect) {

            return (
                x >= rect.x &&
                x <= rect.x + rect.width &&
                y >= rect.y &&
                y <= rect.y + rect.height
            );
        }

        /**
         * 数値フォーマット
         */
        static formatNumber(value) {

            return Number(value).toLocaleString("ja-JP");
        }

        /**
         * ゼロ埋め
         */
        static pad(value, length = 2) {

            return String(value).padStart(length, "0");
        }

        /**
         * ランダムID
         */
        static uuid(length = 8) {

            const chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            let id = "";

            for (let i = 0; i < length; i++) {

                id += chars.charAt(
                    Math.floor(Math.random() * chars.length)
                );
            }

            return id;
        }

        /**
         * ディープコピー
         */
        static clone(data) {

            return JSON.parse(JSON.stringify(data));
        }

        /**
         * スリープ
         */
        static wait(ms) {

            return new Promise(resolve => {

                setTimeout(resolve, ms);

            });
        }

    }

    window.Utils = Utils;

})();