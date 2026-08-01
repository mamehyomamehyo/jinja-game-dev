/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/random.js
 * 乱数ユーティリティ
 * ==========================================================
 */

(() => {
    "use strict";

    class Random {

        /**
         * 0以上1未満
         */
        static value() {

            return Math.random();
        }

        /**
         * 整数
         * min～max（両端含む）
         */
        static int(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
         * 小数
         */
        static float(min, max) {

            return Math.random() * (max - min) + min;
        }

        /**
         * 確率判定
         * rate = 0.0 ～ 1.0
         */
        static chance(rate) {

            return Math.random() < rate;
        }

        /**
         * 配列から1つ取得
         */
        static pick(array) {

            if (!Array.isArray(array) || array.length === 0) {
                return null;
            }

            return array[
                Random.int(0, array.length - 1)
            ];
        }

        /**
         * 配列シャッフル
         */
        static shuffle(array) {

            const result = [...array];

            for (let i = result.length - 1; i > 0; i--) {

                const j = Random.int(0, i);

                [result[i], result[j]] =
                    [result[j], result[i]];
            }

            return result;
        }

        /**
         * 重み付き抽選
         * [{value, weight}]
         */
        static weighted(list) {

            let total = 0;

            for (const item of list) {
                total += item.weight;
            }

            let r = Random.float(0, total);

            for (const item of list) {

                r -= item.weight;

                if (r <= 0) {
                    return item.value;
                }
            }

            return list.length
                ? list[list.length - 1].value
                : null;
        }

        /**
         * 符号
         */
        static sign() {

            return Math.random() < 0.5 ? -1 : 1;
        }

        /**
         * 真偽
         */
        static bool() {

            return Math.random() < 0.5;
        }

    }

    window.Random = Random;

})();