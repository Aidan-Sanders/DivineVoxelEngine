import type { VoxelShapeAddData } from "Meta/index";
import type { DirectionNames, Position3Matrix } from "Meta/Util.types";
type DimenionsMatrix = { width: number; height: number; depth: number };
export const ShapeBuilder = {
 faceFunctions: <
  Record<
   DirectionNames,
   (
    origion: Position3Matrix,
    dimensions: DimenionsMatrix,
    data: VoxelShapeAddData,
    flip ?: boolean
   ) => void
  >
 >{
  top: (origion, dimensions, data,flip) => {


   if (!flip) {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth
    );
   } else {
    data.positions.push(
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth
    );
   }
   data.indices.push(
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex,

    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex
   );
   data.indicieIndex += 4;
  },
  bottom: (origion, dimensions, data,flip) => {

   if (!flip) {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth
    );
   } else {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth
    );
   }
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.indicieIndex += 4;
  },
  south: (origion, dimensions, data,flip) => {

   if (!flip) {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth
    );
   } else {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth
    );
   }
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.indicieIndex += 4;
  },
  north: (origion, dimensions, data,flip) => {

   if (!flip) {
    data.positions.push(
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth
    );
   } else {
    data.positions.push(
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth
    );
   }
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.indicieIndex += 4;
  },
  west:(origion, dimensions, data,flip) => {

   if (!flip) {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth
    );
   } else {
    data.positions.push(
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + -dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth
    );
   }

   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.indicieIndex += 4;
  },
  east: (origion, dimensions, data,flip) => {

   if (!flip) {
    data.positions.push(
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth
    );
   } else {
    data.positions.push(
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + -dimensions.depth,
     origion.x + dimensions.width,
     origion.y + dimensions.height,
     origion.z + dimensions.depth,
     origion.x + dimensions.width,
     origion.y + -dimensions.height,
     origion.z + dimensions.depth
    );
   }

   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,

    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.indicieIndex += 4;
  },
 },

 addFace(
  direction: DirectionNames,
  origion: Position3Matrix,
  dimensions: DimenionsMatrix,
  data: VoxelShapeAddData,
  flip = false,
 ) {
  this.faceFunctions[direction](origion, dimensions, data,flip);
 },
};