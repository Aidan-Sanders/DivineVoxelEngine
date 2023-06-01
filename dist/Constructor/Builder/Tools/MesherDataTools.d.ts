import type { TypedArrays } from "divine-binary-object/Types/DBO.types";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { QuadVertexData } from "../Classes/VertexData.js";
import { MeshAttributes } from "../Types/MeshData.types.js";
export declare class MesherDataTool {
    indicieIndex: number;
    vars: UtilMap<string, number>;
    segments: UtilMap<string, number[]>;
    quadVertexData: UtilMap<string, QuadVertexData>;
    attributes: UtilMap<string, [value: number[], stride: number, dataType: "8ui" | "8i" | "16ui" | "16i" | "32ui" | "32i" | "32f" | "64f" | "8uic"]>;
    addPositions(...positions: number[]): this;
    addNormals(...normals: number[]): this;
    addIndices(...indices: number[]): this;
    addToAttribute(id: string, ...data: number[]): this;
    getAttribute(id: string): number[];
    addToSegment(id: string, ...normals: number[]): this;
    setVar(id: string, value: number): this;
    getVar(id: string): number | undefined;
    resetAll(): this;
    resetSegments(): this;
    resetAttributes(): this;
    resetVars(): this;
    getMeshData(): [TypedArrays[], ArrayBuffer[], number[]];
    getAllAttributes(): [MeshAttributes, ArrayBuffer[]];
}
