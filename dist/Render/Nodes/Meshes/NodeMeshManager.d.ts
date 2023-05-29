import { SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMeshData } from "../types/RenderNode.types.js";
import { DVENodeMesh } from "./NodeMesh.js";
export declare const NodeMeshManager: {
    meshes: UtilMap<string, DVENodeMesh>;
    add(meshes: NodeMeshData[]): void;
    create(id: string, data: SetNodeMesh): false | import("@babylonjs/core").Mesh;
    get(id: string): DVENodeMesh | undefined;
};
