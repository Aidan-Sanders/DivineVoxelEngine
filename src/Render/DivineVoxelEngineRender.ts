//types
import { DVEBabylon, DVEBabylonSystem } from "./Nodes/DVEBabylon.js";
import type { DVERInitData } from "Meta/Render/DVER";
import type { Scene } from "@babylonjs/core";
//objects
import { Util } from "../Global/Util.helper.js";
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { RenderManager } from "./Scene/RenderManager.js";

import { RenderTasks } from "./Tasks/RenderTasks.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { ThreadComm } from "threadcomm";
import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { SceneTool } from "./Tools/SceneTool.js";

//inter comms
import {
 DataComm,
 FXComm,
 NexusComm,
 WorldComm,
 ConstructorCommManager,
 RichWorldComm,
} from "./Threads/RenderThreads.js";
//functions
import { InitWorkers } from "./Init/InitThreads.js";
import { $INITFunction } from "./Init/InitRender.js";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { NodeMeshTool } from "./Tools/NodeMeshTool.js";
import { NodeManager } from "./Nodes/NodeManager.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";

export const DVER = {
 UTIL: Util,
 TC: ThreadComm,
 currentCom: ThreadComm.parent,
 worldComm: WorldComm,
 nexusComm: NexusComm,
 dataComm: DataComm,
 fxComm: FXComm,
 richWorldComm: RichWorldComm,
 constructorCommManager: ConstructorCommManager,

 babylon: DVEBabylon,

 settings: EngineSettings,
 render: RenderManager,

 dataSyncNode: DataSyncNode,
 data: DataManager,

 nodes: NodeManager,

 tasks: RenderTasks,
 async $INIT(initData: DVERInitData) {
  await InitWorkers(this, initData);
 },

 async $SCENEINIT(data: { scene: Scene; system: DVEBabylonSystem }) {
  this.babylon.$INIT(data.system);
  await $INITFunction(this, data.scene);
 },

 getSceneTool() {
  return new SceneTool();
 },
 getRichDataTool() {
  return new RichDataTool();
 },
 getNodeMeshTool() {
  return new NodeMeshTool();
 },
};

export type DivineVoxelEngineRender = typeof DVER;

