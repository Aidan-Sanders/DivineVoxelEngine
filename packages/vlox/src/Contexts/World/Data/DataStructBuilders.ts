import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator";
import { SubstanceDataGenerator } from "./Generators/SubstanceDataGenerator";
import { ChunkStatStruct } from "./Structs/ChunkStruct";
import { ColumnStateStruct } from "./Structs/ColumnStruct";
import { RegionStateStruct } from "./Structs/RegionStruct";
import { LightData } from "../../../Data/LightData";

export class DataStructBuilders {
  voxels = VoxelDataGenerator;
  substances = SubstanceDataGenerator;
  chunkTags = ChunkStatStruct;
  columnTags = ColumnStateStruct;
  regionTags = RegionStateStruct;
  constructor() {
    this.voxels.overrides.set("#dve_light_value", (tags, value, id) => {
      const v = <number[]>value;
      let sl = 0;
      sl = LightData.setR(v[0], sl);
      sl = LightData.setG(v[1], sl);
      sl = LightData.setB(v[2], sl);
      tags.setProperty("#dve_light_value", sl);
    });
  }
}
