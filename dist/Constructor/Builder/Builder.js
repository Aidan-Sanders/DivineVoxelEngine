import { ConstructorHooks } from "../Hooks/ConstructorHooks.js";
import { VoxelConstructors } from "./Constructors/Voxel/VoxelConstructors.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { OverrideManager } from "./Rules/Overrides/OverridesManager.js";
import { RenderedSubstances } from "./Rules/RenderedSubstances.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { TextureProcessor } from "./Processors/TextureProcessor.js";
export const Builder = {
    constructors: VoxelConstructors,
    textureManager: TextureManager,
    chunkProcessor: ChunkProcessor,
    textureProcessor: TextureProcessor,
    overrides: OverrideManager,
    renderedSubstances: RenderedSubstances,
    $INIT() {
        ConstructorHooks.texturesRegistered.addToRun((manager) => {
            this.constructors.constructors._map.forEach((_) => {
                _.onTexturesRegistered(manager);
            });
        });
    },
    buildChunk(location, LOD = 1) {
        this.chunkProcessor.build(location);
        return true;
    },
};
