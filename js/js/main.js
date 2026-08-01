// ============================================
// 神社ゲーム
// main.js
// ゲームの起動・初期化を担当
// ============================================

"use strict";

// ----------------------------
// グローバルゲームオブジェクト
// ----------------------------

const Game = {

    scene: null,
    camera: null,
    renderer: null,

    clock: null,

    initialized: false

};

// ----------------------------
// 初期化
// ----------------------------

function initGame() {

    console.log("神社ゲーム 起動");

    // Scene
    Game.scene = new THREE.Scene();
    Game.scene.background = new THREE.Color(CONFIG.CLEAR_COLOR);

    // Clock
    Game.clock = new THREE.Clock();

    // Renderer
    Game.renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    Game.renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    Game.renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document
        .getElementById("canvas-container")
        .appendChild(Game.renderer.domElement);

    Game.initialized = true;

}

// ----------------------------
// アニメーション
// ----------------------------

function animate() {

    requestAnimationFrame(animate);

    if (!Game.initialized) {
        return;
    }

    Game.renderer.render(
        Game.scene,
        Game.camera
    );

}

// ----------------------------
// リサイズ
// ----------------------------

function onResize() {

    if (!Game.camera) return;

    Game.camera.aspect =
        window.innerWidth /
        window.innerHeight;

    Game.camera.updateProjectionMatrix();

    Game.renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}

// ----------------------------
// 起動
// ----------------------------

window.addEventListener("load", () => {

    initGame();

    animate();

});

window.addEventListener(
    "resize",
    onResize
);