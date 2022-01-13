import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";
import { Player } from "./Player/Player.js";
const DVE = new DivineVoxelEngine();
window.DVE = DVE;
await DVE.$INIT({
    worldWorkerPath: "../../../js/World1/World/index.js",
    builderWorkerPath: "../../../js/World1/Builder/index.js",
});
const player = new Player(DVE);
const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        init();
    }
}, 10);
const init = async () => {
    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    document.body.append(canvas);
    window.addEventListener("click", function () {
        canvas.requestPointerLock();
    });
    const engine = new BABYLON.Engine(canvas, false, {});
    engine.doNotHandleContextLost = true;
    engine.enableOfflineSupport = false;
    engine.setSize(1920, 1080);
    const scene = new BABYLON.Scene(engine);
    //@ts-ignore
    scene.skipPointerMovePicking = true;
    scene.autoClear = false;
    scene.autoClearDepthAndStencil = false;
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.008;
    scene.fogColor = new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255);
    scene.fogEnabled = true;
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 400.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    const camera = new BABYLON.FreeCamera("main", BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.5;
    camera.minZ = 0.01;
    camera.angularSensibility = 4000;
    camera.maxZ = 500;
    scene.activeCamera = camera;
    camera.attachControl(canvas, true);
    player.createPlayerSharedArrays();
    player.createPlayer(scene, camera);
    setInterval(() => {
        player.update();
    }, 100);
    DVE.$SCENEINIT({ scene: scene });
    //render loop
    engine.runRenderLoop(() => {
        scene.render();
    });
    scene.cleanCachedTextureBuffer();
};