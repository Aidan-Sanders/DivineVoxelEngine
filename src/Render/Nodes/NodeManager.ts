import { Scene } from "@babylonjs/core";
import { RenderManager } from "../Scene/RenderManager.js";
import { InitDefaultNodes } from "./InitDefaultNodes.js";
import { DVENodeMaterialManager } from "./Materials/NodeMaterialManager.js";
import { NodeMeshManager } from "./Meshes/NodeMeshManager.js";
import { NodeShaderManager } from "./Shaders/NodeShaderManager.js";
import { TextureManager } from "./Textures/TextureManager.js";

export const NodeManager = {
 shaders: NodeShaderManager,
 meshes: NodeMeshManager,
 materials: DVENodeMaterialManager,
 textures : TextureManager,
 _scene : <Scene> {},

 init() {
  const scene = RenderManager.scene;
  if (!scene) return;
  this.materials.materials._map.forEach((_) => _.createMaterial(scene));
  this._scene = scene;
  this.materials.init();
 },
};
InitDefaultNodes(NodeManager);

