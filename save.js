// ===========================
// 神社ゲーム セーブシステム
// v0.2.1
// ===========================

const SAVE_KEY = "jinja_game_save";

function saveGame() {
    const saveData = {
        points,
        shrineLevel,
        objects: placedObjects.map(obj => ({
            type: obj.userData.type,
            x: obj.position.x,
            z: obj.position.z
        }))
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    console.log("ゲームを保存しました");
}

function loadGame() {
    const data = localStorage.getItem(SAVE_KEY);

    if (!data) return;

    const save = JSON.parse(data);

    points = save.points ?? 0;
    shrineLevel = save.shrineLevel ?? 1;

    while (placedObjects.length > 0) {
        scene.remove(placedObjects[0]);
        placedObjects.shift();
    }

    createLowPolyShrine(shrineLevel);

    save.objects.forEach(obj => {
        spawnObject(obj.type, obj.x, obj.z);
    });

    recalculateCPS();
    updateUI();

    console.log("ゲームを読み込みました");
}
