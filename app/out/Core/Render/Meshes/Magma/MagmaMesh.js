export class MagmaMesh {
    material;
    constructor(material) {
        this.material = material;
    }
    rebuildMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearcColors, fullColors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", linearcColors, false, 4);
        mesh.freezeWorldMatrix();
    }
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("magma", scene);
        mesh.alphaIndex = 0;
        mesh.checkCollisions = false;
        return mesh;
    }
    createMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", linearColors, false, 4);
        mesh.material = this.material.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    }
}