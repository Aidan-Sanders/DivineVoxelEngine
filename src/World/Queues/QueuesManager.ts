//types
import { VoxelSubstanceType } from "Meta/index";
//objects
import { DVEW } from "../DivineVoxelEngineWorld.js";

export const QueuesManager = {
 _numChunksRebuilding: 0,

 _numRGBLightUpdates: 0,
 _numRGBLightRemoves: 0,

 _RGBLightRemoveQue: <number[][]>[],
 _RGBLightUpdateQue: <number[][]>[],

 _chunkRebuildQueMap: <
  Record<string, Record<VoxelSubstanceType | "all", boolean>>
 >{},
 _chunkRebuildQue: <number[][]>[],

 addToRGBUpdateQue(x: number, y: number, z: number) {
  
  this._RGBLightUpdateQue.push([x, y, z]);
 },

 addToRGBRemoveQue(x: number, y: number, z: number) {
  this._RGBLightRemoveQue.push([x, y, z]);
 },

 runRGBUpdateQue() {
  const queue = this._RGBLightUpdateQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   Atomics.add(DVEW.worldGenCommManager.states,0,1);
   DVEW.worldGenCommManager.runRGBFloodFillAt(
    position[0],
    position[1],
    position[2]
   );
  }
  this._RGBLightUpdateQue = [];
 },

 runRGBRemoveQue() {
  const queue = this._RGBLightRemoveQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   DVEW.worldGenCommManager.runRGBFloodRemoveAt(
    position[0],
    position[1],
    position[2]
   );
  }
  this._RGBLightRemoveQue = [];
 },

 awaitAllRGBLightUpdates() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return DVEW.worldGenCommManager.areRGBLightUpdatesAllDone();
   },
   checkInterval: 1,
  });
 },
 awaitAllRGBLightRemove() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager._numRGBLightRemoves == 0;
   },
   checkInterval: 1,
  });
 },

 addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: VoxelSubstanceType | "all"
 ) {
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) return;
  const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = DVEW.worldBounds.getChunkKey(chunkPOS);
  if (!this._chunkRebuildQueMap[chunkKey]) {
   this._chunkRebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
   //@ts-ignore
   this._chunkRebuildQueMap[chunkKey] = {};
   this._chunkRebuildQueMap[chunkKey][substance] = true;
  } else {
   this._chunkRebuildQueMap[chunkKey][substance] = true;
  }
 },

 runRebuildQue() {
  const queue = this._chunkRebuildQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   DVEW.buildChunk(position[0], position[1], position[2]);
  }
 },

 awaitAllChunksToBeBuilt() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager._numChunksRebuilding == 0;
   },
   checkInterval: 1,
  });
 },
};