import { DataTool } from "../../../Tools/Data/DataTool.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { SubstanceDataTool } from "../../../Tools/Data/SubstanceDataTool.js";
export declare const FlowManager: {
    lightData: {
        SRS: number;
        _lightValues: [s: number, r: number, g: number, b: number];
        getS(value: number): number;
        getR(value: number): number;
        getG(value: number): number;
        getB(value: number): number;
        setS(value: number, sl: number): number;
        setR(value: number, sl: number): number;
        setG(value: number, sl: number): number;
        setB(value: number, sl: number): number;
        removeS(sl: number): number;
        hasRGBLight(sl: number): boolean;
        hasSunLight(sl: number): boolean;
        mixLight(l1: number, l2: number): number;
        getRGB(sl: number): number;
        setRGB(value: number, sl: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        setLightValues(values: number[]): number;
        getLightValues(value: number): [s: number, r: number, g: number, b: number];
        isLessThanForRGBRemove(n1: number, n2: number): boolean;
        isLessThanForRGBAdd(n1: number, n2: number): boolean;
        isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
        getMinusOneForRGB(sl: number, nl: number): number;
        removeRGBLight(sl: number): number;
        getFullSunLight(sl: number): number;
        isLessThanForSunAdd(n1: number, n2: number): boolean;
        isLessThanForSunAddDown(n1: number, n2: number): boolean;
        isLessThanForSunAddUp(n1: number, n2: number): boolean;
        getSunLightForUnderVoxel(sl: number, nl: number): number;
        getMinusOneForSun(sl: number, nl: number): number;
        isLessThanForSunRemove(n1: number, sl: number): boolean;
        isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
        sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
        removeSunLight(sl: number): number;
        minusOneForAll(sl: number): number;
    };
    _brush: BrushTool;
    _sDataTool: DataTool;
    _nDataTool: DataTool;
    _substanceTool: SubstanceDataTool;
    setVoxel(tasks: {
        rebuildQueMap: Map<string, boolean>;
        comm: import("threadcomm").CommBase;
        priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: import("voxelspaces").LocationData[];
        aSyncQueue: import("voxelspaces").LocationData[];
        buildMode: "async" | "sync";
        buildTasks: import("../../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../../Meta/Tasks/Tasks.types.js").BuildTasks>;
        rebuildTasks: import("../../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
        tasksType: string;
        origin: import("voxelspaces").LocationData;
        data: null;
        buildQueue: string;
        originThread: string;
        queues: {
            flow: {
                update: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
                remove: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                    noRemoveMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            rgb: {
                update: number[];
                remove: number[];
                map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
            sun: {
                update: number[];
                remove: number[];
                updateMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                remvoeMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
        };
        start(): any;
        stop(): any;
        setPriority(priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities): any;
        getData(): null;
        getOriginThread(): import("voxelspaces").LocationData;
        getBuildQueue(): string;
        getOrigin(): import("voxelspaces").LocationData;
        needsRebuild(): boolean;
        needsToUpdateOriginThread(): boolean;
        setBuldMode(mode: "async" | "sync"): any;
        addToRebuildQueue(x: number, y: number, z: number): boolean;
        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
        runRebuildQueue(): any;
        clear(): void;
    }, vox: string, level: number, levelState: number, x: number, y: number, z: number): void;
    setDimension(dimension: string): void;
    removeVoxel(tasks: {
        rebuildQueMap: Map<string, boolean>;
        comm: import("threadcomm").CommBase;
        priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: import("voxelspaces").LocationData[];
        aSyncQueue: import("voxelspaces").LocationData[];
        buildMode: "async" | "sync";
        buildTasks: import("../../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../../Meta/Tasks/Tasks.types.js").BuildTasks>;
        rebuildTasks: import("../../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
        tasksType: string;
        origin: import("voxelspaces").LocationData;
        data: null;
        buildQueue: string;
        originThread: string;
        queues: {
            flow: {
                update: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
                remove: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                    noRemoveMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            rgb: {
                update: number[];
                remove: number[];
                map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
            sun: {
                update: number[];
                remove: number[];
                updateMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                remvoeMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
        };
        start(): any;
        stop(): any;
        setPriority(priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities): any;
        getData(): null;
        getOriginThread(): import("voxelspaces").LocationData;
        getBuildQueue(): string;
        getOrigin(): import("voxelspaces").LocationData;
        needsRebuild(): boolean;
        needsToUpdateOriginThread(): boolean;
        setBuldMode(mode: "async" | "sync"): any;
        addToRebuildQueue(x: number, y: number, z: number): boolean;
        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
        runRebuildQueue(): any;
        clear(): void;
    }, x: number, y: number, z: number): void;
    getFlowRate(substance: string): number;
    getVoxel(x: number, y: number, z: number): false | DataTool;
    setLevel(level: number, x: number, y: number, z: number): void;
    getLevel(vox: string, x: number, y: number, z: number): number;
    getLevelState(vox: string, x: number, y: number, z: number): number;
    canFlowOutwardTest(vox: string, x: number, y: number, z: number): boolean;
    flowDownTest(vox: string, x: number, y: number, z: number): boolean;
    wait(ms: number): Promise<unknown>;
    _lightValues: [s: number, r: number, g: number, b: number];
    getAbsorbLight(x: number, y: number, z: number): number;
    sunCheck(tasks: {
        rebuildQueMap: Map<string, boolean>;
        comm: import("threadcomm").CommBase;
        priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: import("voxelspaces").LocationData[];
        aSyncQueue: import("voxelspaces").LocationData[];
        buildMode: "async" | "sync";
        buildTasks: import("../../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../../Meta/Tasks/Tasks.types.js").BuildTasks>;
        rebuildTasks: import("../../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
        tasksType: string;
        origin: import("voxelspaces").LocationData;
        data: null;
        buildQueue: string;
        originThread: string;
        queues: {
            flow: {
                update: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
                remove: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                    noRemoveMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            rgb: {
                update: number[];
                remove: number[];
                map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
            sun: {
                update: number[];
                remove: number[];
                updateMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                remvoeMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
        };
        start(): any;
        stop(): any;
        setPriority(priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities): any;
        getData(): null;
        getOriginThread(): import("voxelspaces").LocationData;
        getBuildQueue(): string;
        getOrigin(): import("voxelspaces").LocationData;
        needsRebuild(): boolean;
        needsToUpdateOriginThread(): boolean;
        setBuldMode(mode: "async" | "sync"): any;
        addToRebuildQueue(x: number, y: number, z: number): boolean;
        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
        runRebuildQueue(): any;
        clear(): void;
    }, x: number, y: number, z: number): void;
};
