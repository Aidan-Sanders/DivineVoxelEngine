import { BaseWorldData } from "Meta/Global/BaseWorldData.type.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./Builders/BuilderManager.js";
import { ChunkMaterial } from "./Render/Materials/Chunk/ChunkMaterial.js";
import { ChunkManager } from "./Chunks/ChunkManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { BuildInitalMeshes } from "./Functions/BuildInitalMeshes.js";

export class DivineVoxelEngine {
 world = new World(this);

 renderManager  = new RenderManager();
 chunkManager = new ChunkManager(this);
 builderManager = new BuilderManager(this);
 util: Util = new Util();

 constructor() {}

 async $INIT(data: { worldWorkerPath: string; builderWorkerPath: string }) {
  this.world.createWorldWorker(data.worldWorkerPath);
  this.builderManager.createBuilderWorker(data.builderWorkerPath);

  await this.world.getBaseWorldData();



  window.addEventListener("beforeunload", () => {
   for (const builder of this.builderManager.builders) {
    builder.terminate();
   }
   this.world.worker.terminate();
  });
 }

 async $SCENEINIT(data: { scene: BABYLON.Scene }) {


  await BuildInitalMeshes(this,data.scene);


  this.world.startWorldGen();

  const max = 10;
  let count = max;

  let test = true;
  setInterval(() => {
   if (!count) {
    count = max;

    if (test) {
     this.renderManager.chunkMaterial.runAnimations(3);
     test = false;
    } else {
     test = true;

     this.renderManager.chunkMaterial.runAnimations(4);
    }
   } else {
    count--;
   }
  }, 50);
 }
}