import {
  RemoveChunkMeshTasks,
  SetChunkMeshTask,
} from "../Tasks/RenderTasks.types.js";
import { MeshRegister } from "./MeshRegister.js";
import { LocationData } from "../../../Math/index.js";

import { DivineVoxelEngineRender } from "../../Render/DivineVoxelEngineRender.js";
import { URIMesh } from "@amodx/uri/Meshes/URIMesh.js";
import { DVENodeMeshAttributes } from "../../../Interfaces/Render/Nodes/DVERenderNode.types.js";
import { Square, Circle } from "@amodx/math/Shapes";
import { Vector2Like } from "@amodx/math";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { VoxelEffectRegister } from "../../../VoxelEffects/VoxelEffectRegister.js";
const added = new Set<string>();
export class MeshManager {
  static runningUpdate = false;
  private static columnSquare = new Square(Vector2Like.Create(1, 1), 16);
  private static renderCircle = new Circle(Vector2Like.Create(0.1, 1), 10);
  static removeColumnsOutsideRadius(origion: LocationData, radius: number) {
    const [dimesnionId, x, y, z] = origion;
    const dimension = MeshRegister.dimensions.get(dimesnionId);
    if (!dimension) return;

    this.columnSquare.sideLength = WorldSpaces.column._bounds.x;
    this.renderCircle.radius = radius;
    this.renderCircle.center.x = origion[1];
    this.renderCircle.center.y = origion[3];

    dimension.forEach((region) => {
      region.columns.forEach((column) => {
        const location = column.location;
        this.columnSquare.center.x = location[1];
        this.columnSquare.center.y = location[3];

        if (
          !Circle.IsSquareInsideOrTouchingCircle(
            this.columnSquare,
            this.renderCircle
          )
        ) {
          this.removeColumn(location);
        }
      });
    });
  }

  static remove(data: RemoveChunkMeshTasks) {
    const [location, substance] = data;
    const mesh = MeshRegister.chunk.removeMesh(location, substance);
    if (!mesh) return false;

    DivineVoxelEngineRender.instance.renderer.nodes.meshes
      .get(substance)!
      .returnMesh(mesh);
  }

  static update(data: SetChunkMeshTask) {
    const [location, chunks, effects] = data;
    let i = chunks.length;

    while (i--) {
      const chunkData = chunks[i];
      const substance = chunkData[0];
      const remove = !chunkData[1];

      if (remove) {
        const mesh = MeshRegister.chunk.removeMesh(location, substance);
        if (mesh) {
          DivineVoxelEngineRender.instance.renderer.nodes.meshes
            .get(substance)!
            .returnMesh(mesh);
        }
        continue;
      }
      let chunkMesh = MeshRegister.chunk.getMesh(location, substance);

      let mesh: URIMesh;
      if (!chunkMesh) {
        mesh = DivineVoxelEngineRender.instance.renderer.nodes.meshes
          .get(substance)!
          .createMesh([location[1], location[2], location[3]], chunkData[1][1]);
        (mesh as any).type = "chunk";
        MeshRegister.chunk.addMesh(location, mesh, substance);
      } else {
        mesh = chunkMesh;
        DivineVoxelEngineRender.instance.renderer.nodes.meshes
          .get(substance)!
          .updateVertexData(
            [location[1], location[2], location[3]],
            chunkData[1][1],
            mesh
          );
      }
    }

    const chunk = MeshRegister.chunk.get(location);
    if (chunk) {
      added.clear();
      for (const [id, points] of effects) {
        added.add(id);
        if (!chunk.effects.has(points)) {
          const EffectClass = VoxelEffectRegister.get(id);
          const newEffect = new EffectClass(chunk);
          newEffect.init();
          newEffect.setPoints(points);

          chunk.effects.set(id, newEffect);
        } else {
          const effect = chunk.effects.get(id)!;
          effect.setPoints(points);
        }
      }
      for (const [key, effect] of chunk.effects) {
        if (!added.has(key)) {
          effect.dispose();
          chunk.effects.delete(key);
        }
      }
    }
  }
  static removeColumn(data: LocationData) {
    const column = MeshRegister.column.remove(data);
    if (!column) return false;
    for (const [key, chunk] of column.chunks) {
      for (const [substance, mesh] of chunk.meshes) {
        DivineVoxelEngineRender.instance.renderer.nodes.meshes
          .get(substance)!
          .returnMesh(mesh);
      }
      chunk.dispose();
    }
  }
}
