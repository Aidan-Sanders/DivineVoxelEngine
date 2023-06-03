import { DVEBabylonSystem } from "./Nodes/DVEBabylon.js";
import type { DVERInitData } from "Meta/Render/DVER";
import type { Scene } from "@babylonjs/core";
import { SceneTool } from "./Tools/SceneTool.js";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { NodeMeshTool } from "./Tools/NodeMeshTool.js";
export declare const DVER: {
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
        convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
        converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
    };
    TC: {
        threadNumber: number;
        threadName: string;
        environment: "node" | "browser";
        _comms: Record<string, import("threadcomm").CommBase>;
        _commManageras: Record<string, import("threadcomm").CommManager>;
        _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
        parent: import("threadcomm").CommBase;
        internal: {
            _tasks: Map<number, Map<number, import("threadcomm/Meta/Util.types.js").MessageFunction>>;
            registerTasks(headID: number, taskId: number, run: import("threadcomm/Meta/Util.types.js").MessageFunction): void;
            isInternal(data: any): boolean;
            runInternal(data: any, event: any): false | undefined;
        };
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        crypto: Crypto;
        $INIT(threadName: string, threadParentName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("threadcomm").CommBase): void;
        createComm<T_2>(name: string, mergeObject?: T_2 | undefined): T_2 & import("threadcomm").CommBase;
        createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
        getComm(id: string): import("threadcomm").CommBase;
        getCommManager(id: string): import("threadcomm").CommManager;
        getWorkerPort(): Promise<any>;
        registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: ((data?: any, transfers?: any) => void) | undefined) => void, mode?: "async" | "deferred" | undefined): void;
        onDataSync<T_2, K_1>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("threadcomm").DataSync<T_2, K_1>;
    };
    currentCom: import("threadcomm").CommBase;
    worldComm: import("threadcomm").CommBase;
    nexusComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    dataComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    fxComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    richWorldComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    constructorCommManager: import("threadcomm").CommManager & {
        $INIT(): void;
        syncTextureData(dasta: import("../index.js").TextureTypeUVMap): void;
        setConstructors(constructors: Worker[]): void;
    };
    babylon: {
        system: DVEBabylonSystem;
        $INIT(system: DVEBabylonSystem): void;
    };
    settings: {
        enviorment: "node" | "browser";
        settings: import("../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
        getSettings(): import("../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
        syncSettings(data: import("../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        }): void;
        getSettingsCopy(): any;
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
        doFlow(): boolean;
        saveWorldData(): boolean;
        isServer(): boolean;
        isClient(): boolean;
    };
    render: {
        meshRegister: {
            _dimensions: import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterDimensions;
            $INIT(): void;
            clearAll(): void;
            dimensions: {
                add(id: string): Map<any, any>;
                get(id: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion> | undefined;
                remove(id: string): boolean;
            };
            region: {
                add(location: import("voxelspaces").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
                remove(location: import("voxelspaces").LocationData): boolean;
                _getRegionData(): import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            };
            column: {
                add(location: import("voxelspaces").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                remove(location: import("voxelspaces").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                _getColumnData(location: import("voxelspaces").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn | undefined;
            };
            chunk: {
                add(location: import("voxelspaces").LocationData, mesh: import("@babylonjs/core").Mesh, substance: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
                _getChunkData(mesh: import("@babylonjs/core").Mesh): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
                remove(location: import("voxelspaces").LocationData, substance: string): false | import("@babylonjs/core").Mesh;
                get(location: import("voxelspaces").LocationData, substance: string): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            };
        };
        meshManager: {
            scene: Scene;
            runningUpdate: boolean;
            $INIT(scene: Scene): void;
            removeColumnsOutsideRadius(origion: import("voxelspaces").LocationData, radius: number): void;
            chunks: {
                remove(data: import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
                update(data: import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
                removeColumn(data: import("voxelspaces").LocationData): false | undefined;
            };
        };
        meshCuller: {
            $INIT(scene: Scene): void;
        };
        fo: {
            activeCamera: import("@babylonjs/core").TransformNode | null;
            activeNode: import("@babylonjs/core").TransformNode | null;
            onOriginSet: Function[];
            registerOnOriginSet(run: (node: import("@babylonjs/core").TransformNode) => void): void;
            setOriginCenter(scene: Scene, object: {
                position: import("@babylonjs/core").Vector3;
            }): void;
        };
        shaders: {
            builder: {
                shaders: {
                    _shaders: Map<string, import("divine-shaders").DivineShader>;
                    create(id: string): import("divine-shaders").DivineShader;
                };
                functions: {
                    _functions: Map<string, import("divine-shaders").ShaderFunctionData<any>>;
                    _functionSets: Map<string, string[]>;
                    create(id: string, data: import("divine-shaders").ShaderFunctionData<any>): void;
                    _processFunctinos(id: string, data: import("divine-shaders").ShaderFunctionData<any>, shader?: import("divine-shaders").DivineShader | null | undefined): string;
                    build(id: string, data?: import("divine-shaders").ShaderFunctionData<any> | null | undefined, shader?: import("divine-shaders").DivineShader | null | undefined): string;
                };
                define: {
                    _process(data: import("divine-shaders").ShaderDefinesData): string;
                    build(data: import("divine-shaders").ShaderDefinesData | import("divine-shaders").ShaderDefinesData[] | Map<string, import("divine-shaders").ShaderDefinesData>): string;
                };
                uniforms: {
                    _process(data: import("divine-shaders").ShaderUniformData): string;
                    build(data: import("divine-shaders").ShaderUniformData | import("divine-shaders").ShaderUniformData[] | Map<string, import("divine-shaders").ShaderUniformData>): string;
                };
                snippets: {
                    _snippets: Map<string, import("divine-shaders").ShaderSnippetData<any>>;
                    create(data: import("divine-shaders").ShaderSnippetData<any>): void;
                    override(id: string, data: import("divine-shaders").ShaderSnippetData<any>): boolean;
                    get(id: string, args?: any): string;
                    _process(text: string, shader?: import("divine-shaders").DivineShader | undefined): {
                        newBody: string;
                        foundSnippet: boolean;
                    };
                    build(text: string, shader?: import("divine-shaders").DivineShader | undefined): string;
                };
            };
            voxelAttributes: [id: string, type: import("divine-shaders").ShaderDataTypes][];
            voxelSharedUniforms: [id: string, type: import("divine-shaders").ShaderDataTypes][];
            voxelVertexUniforms: [id: string, type: import("divine-shaders").ShaderDataTypes][];
            voxelVarying: import("divine-shaders").ShaderVaryingData<any>[];
            voxelFragFunctions: string[];
            voxelVertexFunctions: string[];
            _defaultShader: import("divine-shaders").DivineShader;
            $INIT(): void;
            createVoxelShader(id: string): import("divine-shaders").DivineShader;
            createBasicTextureShader(id: string): import("divine-shaders").DivineShader;
            createSkyBoxShader(id: string): import("divine-shaders").DivineShader;
        };
        sceneTool: SceneTool;
        scene: Scene | null;
        $INIT(scene: Scene): void;
        getScene(): Scene | null;
    };
    dataSyncNode: {
        maps: {
            strings: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
            objects: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
        };
        palettes: {
            voxel: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").PaletteSyncData, any>;
            substance: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").PaletteSyncData, any>;
        };
        worldData: {
            dimension: import("threadcomm").DataSync<import("../Meta/Data/DimensionData.types.js").DimensionData, void>;
            chunk: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
            column: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
            region: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
            regionHeader: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
        };
        tags: {
            voxel: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
            substance: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, any>;
            chunk: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
            column: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
            region: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData[], void>;
        };
    };
    data: {
        world: {
            _currentionDimension: string;
            paint: {
                _dt: import("../Tools/Data/DataTool.js").DataTool;
                voxel(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                __paint(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                erase(location: import("voxelspaces").LocationData): void;
            };
        };
        worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        };
        spaces: {
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
            $INIT(settings: import("../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
        };
        registers: {
            dimensions: {
                _count: number;
                dimensionRecord: Record<string, number>;
                dimensionMap: Record<number, string>;
                __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
                _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
                registerDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
                getDimension(id: string | number): import("../Meta/Data/DimensionData.types.js").DimensionData;
                getDimensionStringId(id: string | number): string;
                getDimensionNumericId(id: string | number): number;
            };
            world: {
                _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
                _cacheOn: boolean;
                _chunkCache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
                _columnCache: Map<string, import("../Meta/Data/WorldData.types.js").Column>;
                cache: {
                    enable(): void;
                    disable(): void;
                    _addChunk(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
                    _addColumn(key: string, data: import("../Meta/Data/WorldData.types.js").Column): void;
                    _getChunk(key: string): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                    _getColumn(key: string): import("../Meta/Data/WorldData.types.js").Column | undefined;
                };
                dimensions: {
                    add(id: string | number): Map<any, any>;
                    get(id: string | number): Map<string, import("../Meta/Data/WorldData.types.js").Region> | undefined;
                };
                region: {
                    add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                    _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                    get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Region;
                    remove(location: import("voxelspaces").LocationData): boolean;
                };
                column: {
                    add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
                    _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
                    get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Column;
                    remove(location: import("voxelspaces").LocationData): boolean;
                    fill(location: import("voxelspaces").LocationData): void;
                };
                chunk: {
                    add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                    _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                    addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                    get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                    remove(location: import("voxelspaces").LocationData): boolean;
                };
            };
            mapped: {
                stringMaps: {
                    segments: Map<string, Map<string, string[]>>;
                    sync(data: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
                    get(segment: string, id: string, index: number): string;
                };
                objectMaps: {
                    segments: Map<string, Map<string, Record<number, any>>>;
                    sync(data: import("../Meta/Data/DataSync.types.js").RegisterObjectMapSync): void;
                    get(segment: string, id: string, index: number): any;
                };
            };
            regionHeader: {
                _headers: Map<string, Map<string, {
                    data: DataView;
                    buffer: SharedArrayBuffer;
                }>>;
                remove(location: import("voxelspaces").LocationData): boolean;
                add(location: import("voxelspaces").LocationData, buffer: SharedArrayBuffer): void;
                get(location: import("voxelspaces").LocationData): false | {
                    data: DataView;
                    buffer: SharedArrayBuffer;
                } | undefined;
                isStored(location: import("voxelspaces").LocationData): 0 | 1 | -1;
            };
        };
        tags: {
            voxels: {
                voxelIndex: Uint16Array;
                id: string;
                sync(voxelMap: Uint16Array): void;
                setVoxel(id: number): void;
                initData: import("divine-binary-tags").RemoteTagManagerInitData;
                $INIT(data: import("divine-binary-tags").RemoteTagManagerInitData): void;
                byteOffSet: number;
                tagSize: number;
                tagIndexes: number;
                data: DataView;
                indexMap: Map<string, number>;
                index: DataView;
                setBuffer(data: DataView | import("divine-binary-tags").BufferTypes): void;
                getBuffer(): ArrayBuffer;
                setTagIndex(index: number): void;
                getTag(id: string): number;
                setTag(id: string, value: number): boolean;
                getArrayTagValue(id: string, index: number): number;
                getArrayTagByteIndex(id: string, index: number): number;
                setArrayTagValue(id: string, index: number, value: number): number | void;
                loopThroughTags(run: (id: string, value: number) => void): void;
                loopThroughIndex(run: (data: number[]) => void): void;
                loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
            };
            substances: {
                id: string;
                setSubstance(id: string | number): void;
                initData: import("divine-binary-tags").RemoteTagManagerInitData;
                $INIT(data: import("divine-binary-tags").RemoteTagManagerInitData): void;
                byteOffSet: number;
                tagSize: number;
                tagIndexes: number;
                data: DataView;
                indexMap: Map<string, number>;
                index: DataView;
                setBuffer(data: DataView | import("divine-binary-tags").BufferTypes): void;
                getBuffer(): ArrayBuffer;
                setTagIndex(index: number): void;
                getTag(id: string): number;
                setTag(id: string, value: number): boolean;
                getArrayTagValue(id: string, index: number): number;
                getArrayTagByteIndex(id: string, index: number): number;
                setArrayTagValue(id: string, index: number, value: number): number | void;
                loopThroughTags(run: (id: string, value: number) => void): void;
                loopThroughIndex(run: (data: number[]) => void): void;
                loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
            };
            chunks: import("divine-binary-tags").RemoteTagManager;
            column: import("divine-binary-tags").RemoteTagManager;
            region: import("divine-binary-tags").RemoteTagManager;
        };
    };
    nodes: {
        shaders: {
            shaders: import("../Global/Util/UtilMap.js").UtilMap<string, import("divine-shaders").DivineShader>;
            create(shaders: import("divine-shaders").DivineShader[]): void;
            get(id: string): import("divine-shaders").DivineShader | undefined;
            getBulder(): {
                shaders: {
                    _shaders: Map<string, import("divine-shaders").DivineShader>;
                    create(id: string): import("divine-shaders").DivineShader;
                };
                functions: {
                    _functions: Map<string, import("divine-shaders").ShaderFunctionData<any>>;
                    _functionSets: Map<string, string[]>;
                    create(id: string, data: import("divine-shaders").ShaderFunctionData<any>): void;
                    _processFunctinos(id: string, data: import("divine-shaders").ShaderFunctionData<any>, shader?: import("divine-shaders").DivineShader | null | undefined): string;
                    build(id: string, data?: import("divine-shaders").ShaderFunctionData<any> | null | undefined, shader?: import("divine-shaders").DivineShader | null | undefined): string;
                };
                define: {
                    _process(data: import("divine-shaders").ShaderDefinesData): string;
                    build(data: import("divine-shaders").ShaderDefinesData | import("divine-shaders").ShaderDefinesData[] | Map<string, import("divine-shaders").ShaderDefinesData>): string;
                };
                uniforms: {
                    _process(data: import("divine-shaders").ShaderUniformData): string;
                    build(data: import("divine-shaders").ShaderUniformData | import("divine-shaders").ShaderUniformData[] | Map<string, import("divine-shaders").ShaderUniformData>): string;
                };
                snippets: {
                    _snippets: Map<string, import("divine-shaders").ShaderSnippetData<any>>;
                    create(data: import("divine-shaders").ShaderSnippetData<any>): void;
                    override(id: string, data: import("divine-shaders").ShaderSnippetData<any>): boolean;
                    get(id: string, args?: any): string;
                    _process(text: string, shader?: import("divine-shaders").DivineShader | undefined): {
                        newBody: string;
                        foundSnippet: boolean;
                    };
                    build(text: string, shader?: import("divine-shaders").DivineShader | undefined): string;
                };
            };
        };
        meshes: {
            meshes: import("../Global/Util/UtilMap.js").UtilMap<string, import("./Nodes/Meshes/NodeMesh.js").DVENodeMesh>;
            add(meshes: import("./Nodes/types/RenderNode.types.js").NodeMeshData[]): void;
            create(id: string, data: import("../Meta/Tasks/RenderTasks.types.js").SetNodeMesh): false | import("@babylonjs/core").Mesh;
            get(id: string): import("./Nodes/Meshes/NodeMesh.js").DVENodeMesh | undefined;
        };
        materials: {
            materials: import("../Global/Util/UtilMap.js").UtilMap<string, import("./Nodes/Materials/NodeMaterial.js").DVENodeMaterial>;
            fogOptions: import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions;
            fogData: import("@babylonjs/core").Vector4;
            unifrosm: {
                lightGradient: number[];
            };
            init(): void;
            get(id: string): import("./Nodes/Materials/NodeMaterial.js").DVENodeMaterial | null;
            create(materials: import("./Nodes/types/RenderNode.types.js").NodeMaterialData[]): void;
            _updateFogData(data: import("@babylonjs/core").Vector4): void;
            setSunLevel(level: number): void;
            setBaseLevel(level: number): void;
            setOption(id: string, value: boolean): void;
            updateFogOptions(options: import("../index.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions>): void;
        };
        textures: {
            defaultTexturePath: string;
            textureTypes: Map<string, import("./Nodes/Textures/TextureType.js").TextureType>;
            uvMap: import("../index.js").TextureTypeUVMap;
            getTextureIndex(data: import("../index.js").ConstructorTextureData, overlay?: boolean): number;
            _ready: boolean;
            isReady(): boolean;
            $INIT(): Promise<void>;
            $START_ANIMATIONS(): void;
            generateTextureUVMap(): import("../index.js").TextureTypeUVMap;
            defineDefaultTexturePath(path: string): void;
            getTextureType(id: string): false | import("./Nodes/Textures/TextureType.js").TextureType;
            addTextureType(id: string): import("./Nodes/Textures/TextureType.js").TextureType;
            clearTextureData(): void;
            registerTexture(textureData: import("../index.js").TextureData | import("../index.js").TextureData[]): void;
            createRawDataMap(): Promise<Map<string, Uint8ClampedArray>>;
        };
        substances: {
            substances: import("../Global/Util/UtilMap.js").UtilMap<string, import("./Nodes/Substances/NodeSubstance.js").NodeSubstance>;
            add(meshes: import("./Nodes/types/RenderNode.types.js").NodeSubstanceData[]): void;
            buldAll(): void;
            get(id: string): import("./Nodes/Substances/NodeSubstance.js").NodeSubstance | undefined;
        };
        _scene: Scene;
        init(): void;
    };
    tasks: {
        setChunk: void;
        removeChunk: void;
        removeColumn: void;
        clearAll: void;
        removeColumnsOutsideRadius: void;
        setNodeMesh: void;
    };
    $INIT(initData: DVERInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: Scene;
        system: DVEBabylonSystem;
    }): Promise<void>;
    getSceneTool(): SceneTool;
    getRichDataTool(): RichDataTool;
    getNodeMeshTool(): NodeMeshTool;
};
export type DivineVoxelEngineRender = typeof DVER;
