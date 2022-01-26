export class FluidMeshBuilder {
    shapeManager;
    UTIL;
    infoByte;
    constructor(shapeManager, UTIL) {
        this.shapeManager = shapeManager;
        this.UTIL = UTIL;
        this.infoByte = this.UTIL.getInfoByte();
    }
    templateMap = {};
    savedTemplates = {};
    removeTemplate(chunkX, chunkY, chunkZ) {
        delete this.savedTemplates[`${chunkX}-${chunkZ}-${chunkY}`];
        delete this.templateMap[`${chunkX}-${chunkZ}-${chunkY}`];
    }
    generateMesh() {
        const positions = [];
        const indices = [];
        const uvs = [];
        const RGBLightColors = [];
        const sunLightColors = [];
        const colors = [];
        let indicieIndex = 0;
        let count = 0;
        for (const chunkKey of Object.keys(this.savedTemplates)) {
            const template = this.savedTemplates[chunkKey];
            const chunkCords = this.templateMap[chunkKey];
            const positionsTemplate = template[0];
            const faceTemplate = template[1];
            const shapeTemplate = template[2];
            const uvTemplate = template[3];
            const lightTemplate = template[4];
            const aoTemplate = template[5];
            let aoIndex = 0;
            let uvIndex = 0;
            let RGBLightIndex = 0;
            let shapeIndex = 0;
            let positionIndex = 0;
            let sunLightIndex = 0;
            let colorIndex = 0;
            for (let faceIndex = 0; faceIndex < faceTemplate.length; faceIndex++) {
                count++;
                const x = positionsTemplate[positionIndex] + chunkCords[0];
                const y = positionsTemplate[positionIndex + 1];
                const z = positionsTemplate[positionIndex + 2] + chunkCords[1];
                const shapeId = shapeTemplate[shapeIndex];
                const shape = this.shapeManager.getShape(shapeId);
                const newIndexes = shape.addToChunkMesh({
                    positions: positions,
                    indices: indices,
                    RGBLightColors: RGBLightColors,
                    sunLightColors: sunLightColors,
                    colors: colors,
                    AOColors: [],
                    uvs: uvs,
                    face: faceTemplate[faceIndex],
                    indicieIndex: indicieIndex,
                    unTemplate: uvTemplate,
                    uvTemplateIndex: uvIndex,
                    colorTemplate: lightTemplate,
                    colorIndex: colorIndex,
                    RGBLightTemplate: lightTemplate,
                    rgbLightIndex: RGBLightIndex,
                    sunLightTemplate: lightTemplate,
                    sunlightIndex: sunLightIndex,
                    aoTemplate: lightTemplate,
                    aoIndex: aoIndex,
                    position: { x: x, y: y, z: z },
                });
                indicieIndex = newIndexes.newIndicieIndex;
                aoIndex = newIndexes.newAOIndex;
                uvIndex = newIndexes.newUVTemplateIndex;
                RGBLightIndex = newIndexes.newRGBLightIndex;
                sunLightIndex = newIndexes.newSunLightIndex;
                colorIndex = newIndexes.newColorIndex;
                shapeIndex++;
                positionIndex += 3;
            }
        }
        return [positions, indices, RGBLightColors, uvs];
    }
    addTemplate(chunkX, chunkY, chunkZ, newPositionsTemplate, newFaceTemplate, newShapeTemplate, newUvTemplate, newLightTemplate, newAoTemplate) {
        this.savedTemplates[`${chunkX}-${chunkZ}-${chunkY}`] = [
            newPositionsTemplate,
            newFaceTemplate,
            newShapeTemplate,
            newUvTemplate,
            newLightTemplate,
            newAoTemplate,
        ];
        this.templateMap[`${chunkX}-${chunkZ}-${chunkY}`] = [chunkX, chunkZ, chunkY];
    }
}