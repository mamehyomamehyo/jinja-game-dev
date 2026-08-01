/**
 * ==========================================================
 * 神社ゲーム v1.0
 * File: js/core/audio.js
 * オーディオ管理
 * ==========================================================
 */

(() => {
    "use strict";

    class AudioManager {

        constructor() {

            this.bgm = new Map();
            this.se = new Map();

            this.currentBgm = null;

            this.bgmVolume = 1.0;
            this.seVolume = 1.0;

            this.muted = false;
        }

        /**
         * BGM登録
         */
        loadBgm(name, src) {

            const audio = new Audio(src);

            audio.loop = true;
            audio.preload = "auto";
            audio.volume = this.bgmVolume;

            this.bgm.set(name, audio);

            return audio;
        }

        /**
         * 効果音登録
         */
        loadSe(name, src) {

            const audio = new Audio(src);

            audio.preload = "auto";
            audio.volume = this.seVolume;

            this.se.set(name, audio);

            return audio;
        }

        /**
         * BGM再生
         */
        playBgm(name) {

            if (!this.bgm.has(name)) {
                return;
            }

            if (this.currentBgm) {

                this.currentBgm.pause();
                this.currentBgm.currentTime = 0;
            }

            const bgm = this.bgm.get(name);

            bgm.volume = this.muted ? 0 : this.bgmVolume;

            bgm.play().catch(() => {});

            this.currentBgm = bgm;
        }

        /**
         * BGM停止
         */
        stopBgm() {

            if (!this.currentBgm) {
                return;
            }

            this.currentBgm.pause();
            this.currentBgm.currentTime = 0;

            this.currentBgm = null;
        }

        /**
         * BGM一時停止
         */
        pauseBgm() {

            if (this.currentBgm) {
                this.currentBgm.pause();
            }
        }

        /**
         * BGM再開
         */
        resumeBgm() {

            if (this.currentBgm) {
                this.currentBgm.play().catch(() => {});
            }
        }

        /**
         * 効果音再生
         */
        playSe(name) {

            if (!this.se.has(name)) {
                return;
            }

            const original = this.se.get(name);

            const audio = original.cloneNode();

            audio.volume = this.muted ? 0 : this.seVolume;

            audio.play().catch(() => {});
        }

        /**
         * BGM音量
         */
        setBgmVolume(volume) {

            this.bgmVolume = Math.max(0, Math.min(1, volume));

            if (this.currentBgm && !this.muted) {
                this.currentBgm.volume = this.bgmVolume;
            }
        }

        /**
         * SE音量
         */
        setSeVolume(volume) {

            this.seVolume = Math.max(0, Math.min(1, volume));
        }

        /**
         * ミュート
         */
        setMute(flag) {

            this.muted = flag;

            if (this.currentBgm) {

                this.currentBgm.volume = flag
                    ? 0
                    : this.bgmVolume;
            }
        }

        /**
         * ミュート状態
         */
        isMuted() {
            return this.muted;
        }

        /**
         * BGM存在確認
         */
        hasBgm(name) {
            return this.bgm.has(name);
        }

        /**
         * SE存在確認
         */
        hasSe(name) {
            return this.se.has(name);
        }

    }

    window.AudioManager = AudioManager;

})();