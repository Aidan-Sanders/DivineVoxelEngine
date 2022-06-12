//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { ConstructorToWorldMessages } from "../../Constants/InterComms/ConstructorToWorld.js";
export const DVEP = {
    illumination: IlluminationManager,
    rebuildQueMap: {},
    $INIT() { },
    addToRebuildQue(x, y, z, substance) {
        const chunkPOS = DVEC.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = DVEC.worldBounds.getChunkKey(chunkPOS);
        if (!this.rebuildQueMap[chunkKey]) {
            this.rebuildQueMap[chunkKey] = true;
            DVEC.worldComm.sendMessage(ConstructorToWorldMessages.addToRebuildQue, [
                x,
                y,
                z,
                substance,
            ]);
        }
    },
    runRGBFloodFill(x, y, z) {
        this.illumination.runRGBFloodFillAt(x, y, z);
        DVEC.queues.finishRGBLightUpdate();
        this.rebuildQueMap = {};
    },
    runRGBFloodRemove(x, y, z) {
        this.illumination.runRGBFloodRemoveAt(true, x, y, z);
        DVEC.queues.finishRGBLightRemove();
        this.rebuildQueMap = {};
    },
    runSunLightForWorldColumn(x, z, maxY) {
        this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
        DVEC.queues.finishWorldColumnSunLightProp();
        this.rebuildQueMap = {};
    },
    runSunFloodFillAtMaxY(x, z, maxY) {
        this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
        DVEC.queues.finishSunLightUpdateAtMaxY();
        this.rebuildQueMap = {};
    },
    runSunFloodFillMaxYFlood(x, z, maxY) {
        this.illumination.runSunLightFloodOut(x, z);
        DVEC.queues.finishSunLightUpdateMaxYFlood();
        this.rebuildQueMap = {};
    },
    runSunLightUpdate(x, y, z) {
        this.illumination.runSunLightUpdateAt(x, y, z);
        DVEC.queues.finishSunLightUpdate();
        this.rebuildQueMap = {};
    },
    runSunLightRemove(x, y, z) {
        this.illumination.runSunLightRemoveAt(x, y, z);
        DVEC.queues.finishSunLightRemove();
        this.rebuildQueMap = {};
    },
};