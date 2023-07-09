import type { MeshRegisterChunk, MeshRegisterDimensions, MushRegisterRegion, MeshRegisterColumn } from "Meta/Render/Scene/MeshRegister.types.js";
import type { LocationData } from "voxelspaces";
import type { Mesh } from "@babylonjs/core";
import type { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types.js";
export declare const MeshRegister: {
    _dimensions: MeshRegisterDimensions;
    $INIT(): void;
    clearAll(): void;
    dimensions: {
        add(id: string): Map<any, any>;
        get(id: string): Map<string, MushRegisterRegion> | undefined;
        getAllMeshes(id: string): Generator<[location: LocationData, substance: string, mesh: Mesh]>;
        remove(id: string): boolean;
    };
    region: {
        add(location: LocationData): MushRegisterRegion;
        remove(location: LocationData): boolean;
        _getRegionData(): MushRegisterRegion;
        get(location: LocationData): false | MushRegisterRegion;
    };
    column: {
        add(location: LocationData): MeshRegisterColumn;
        remove(location: LocationData): false | MeshRegisterColumn;
        _getColumnData(location: LocationData): MeshRegisterColumn;
        get(location: LocationData): false | MeshRegisterColumn | undefined;
    };
    chunk: {
        add(location: LocationData, mesh: Mesh, substance: VoxelTemplateSubstanceType): Map<string, MeshRegisterChunk>;
        _getChunkData(mesh: Mesh): MeshRegisterChunk;
        remove(location: LocationData, substance: VoxelTemplateSubstanceType): false | Mesh;
        get(location: LocationData, substance: VoxelTemplateSubstanceType): false | MeshRegisterChunk;
    };
};
