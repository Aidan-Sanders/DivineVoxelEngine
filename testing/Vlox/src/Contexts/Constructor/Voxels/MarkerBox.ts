import { VoxelFaces } from "@divinevoxel/vlox/Math";

import { VoxelConstructor } from "@divinevoxel/vlox/Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { CubeVoxelShape } from "@divinevoxel/vlox/Mesher/Shapes/default/Cube/Cube.voxel.shape";

export function GetMarkerBox(): VoxelConstructor {
  const textures: number[] = [];

  return {
    id: "dve_marker_box",
    onTexturesRegistered(textureMangager) {
      for (let i = 0; i < 16; i++) {
        textures.push(
          textureMangager.getTextureUV([
            "#dve_solid",
            "dve_light_debug",
            `light-level-${i}`,
          ])
        );
      }
    },
    process(tool) {
      const uv = textures[tool.voxel.getShapeState()];

      tool.getOverlayTextures().setAll(0);
      if (tool.isFaceExposed(VoxelFaces.Up)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Up);
        CubeVoxelShape.add.up();
      }
      if (tool.isFaceExposed(VoxelFaces.Down)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.Down);
        CubeVoxelShape.add.down();
      }
      if (tool.isFaceExposed(VoxelFaces.East)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.East);
        CubeVoxelShape.add.east();
      }
      if (tool.isFaceExposed(VoxelFaces.West)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.West);
        CubeVoxelShape.add.west();
      }
      if (tool.isFaceExposed(VoxelFaces.South)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.South);
        CubeVoxelShape.add.south();
      }
      if (tool.isFaceExposed(VoxelFaces.North)) {
        tool.setTexture(uv).calculateLight(VoxelFaces.North);
        CubeVoxelShape.add.north();
      }
    },
  };
}
