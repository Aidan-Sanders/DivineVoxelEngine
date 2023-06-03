export declare const Propagation: {
    expolosion: {
        run(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: number;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    remove: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                queue: [x: number, y: number, z: number][];
                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): number;
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
        }): void;
    };
    flow: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    remove: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
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
        }): Promise<void>;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    remove: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
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
        }): Promise<void>;
    };
    worldSun: {
        run(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                sun: number[];
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
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
        }): void;
    };
    rgb: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
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
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
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
        }): void;
    };
    sun: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
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
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
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
        }): void;
    };
};
