import type { LocationData } from "voxelspaces";
export declare const ChunkProcessor: {
    relative: {
        x: number;
        y: number;
        z: number;
    };
    nLocation: LocationData;
    _states: {
        foundVoxel: boolean;
    };
    _process(doSecondCheck?: boolean): void;
    build(location: LocationData): void;
};
