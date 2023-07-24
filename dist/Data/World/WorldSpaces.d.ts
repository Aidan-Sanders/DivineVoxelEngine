import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
export declare const WorldSpaces: {
    region: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
        chunkBounds: {
            x: number;
            y: number;
            z: number;
        };
        columnBounds: {
            x: number;
            y: number;
            z: number;
        };
        getChunkVolume(): number;
        getColumnVolume(): number;
    };
    column: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
    chunk: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
        _regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        getRegionPositonx(): {
            x: number;
            y: number;
            z: number;
            copy(): any;
            copyTo(vec3: {
                x: number;
                y: number;
                z: number;
            }): void;
            toString(): string;
            multiply(vec3: {
                x: number;
                y: number;
                z: number;
            }): any;
            toArray(): [number, number, number];
        };
        getRegionPositonxXYZ(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
            copy(): any;
            copyTo(vec3: {
                x: number;
                y: number;
                z: number;
            }): void;
            toString(): string;
            multiply(vec3: {
                x: number;
                y: number;
                z: number;
            }): any;
            toArray(): [number, number, number];
        };
        getRegionIndex(): number;
        getRegionIndexXYZ(x: number, y: number, z: number): number;
    };
    voxel: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
    setDimensions(data: {
        regions: {
            x: number;
            y: number;
            z: number;
        };
        columns: {
            x: number;
            y: number;
            z: number;
        };
        chunks: {
            x: number;
            y: number;
            z: number;
        };
    }): void;
} & {
    $INIT(settings: EngineSettingsData): void;
};
