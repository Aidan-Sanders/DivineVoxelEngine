import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { DVENodeMesh } from "./NodeMesh.js";
export const NodeMeshManager = {
    meshes: new UtilMap(),
    add(meshes) {
        for (const mesh of meshes) {
            this.meshes.add([[mesh.id, new DVENodeMesh(mesh)]]);
        }
    },
    create(id, data) {
        const nodeMesh = this.meshes.get(id);
        if (!nodeMesh)
            return false;
        return nodeMesh.createMesh(data);
    },
    get(id) {
        return this.meshes.get(id);
    },
};
