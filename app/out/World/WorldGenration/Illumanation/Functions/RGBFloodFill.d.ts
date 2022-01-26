import type { IlluminationManager } from "../IlluminationManager";
export declare function RGBFloodFillCheckNeighbors(this: IlluminationManager, x: number, y: number, z: number): void;
export declare function RGBFloodFillUpdateAirLightVoxel(this: IlluminationManager, airBlock: any[], x: number, y: number, z: number): void;
export declare function RGBFloodFillSetAirLightVoxels(this: IlluminationManager, x: number, y: number, z: number): void;
export declare function RGBFloodFill(this: IlluminationManager, voxelData: number[], lightEncodedData: number, chunkX: number, chunkY: number, chunkZ: number, startX: number, startY: number, startZ: number, radius: number): void;