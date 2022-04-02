import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVE } from "../../out/index.js";
import { Player } from "../Shared/Player/Type2/Player.js";

const workers = SetUpWorkers(
 import.meta.url,
 "./World/index.js",
 "../Shared/Builder/builder.js",
 "../Shared/FluidBuilder/fluidbuilder.js"
);

await DVE.$INIT({
 worldWorker: workers.worldWorker,
 builderWorker: workers.builderWorkers,
 fluidBuilderWorker: workers.fluidBuilderWorker,
});
const player = new Player(DVE);

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 1, z: 0 });
 SetUpDefaultSkybox(scene);

 await DVE.$SCENEINIT({ scene: scene });

 player.createPlayerSharedArrays();
 player.createPlayer(scene, camera);
 (window as any).player = player;
 setInterval(() => {
  player.update();
 }, 10);

 runRenderLoop(engine, scene, player.hitbox);
};

RunInit(init);