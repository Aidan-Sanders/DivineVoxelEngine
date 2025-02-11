import {
  CompassDirectionVoxelFaceMap,
  VoxelFaceCompassDirectionMap,
  VoxelFaces,
} from "../../../../Math/index.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { QuadVertexData } from "@amodx/meshing/Classes/QuadVertexData.js";
import { QuadUVData, QuadVerticies } from "@amodx/meshing/Geometry.types.js";
import {
  AMath,
  Directions,
  Mat3Array,
  Matrix3x3Like,
  Vec3Array,
  Vector3Like,
} from "@amodx/math";

import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData.js";

import { StairStates } from "./StairStates.js";
import { ShapeTool } from "../../ShapeTool.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { LightData } from "../../../../Data/LightData.js";

/**
 * types
 */
type QuadPath = [start: Vec3Array, end: Vec3Array];
type StairQuadData = [
  QuadPath,
  uvs: QuadUVData,
  QuadVertexData<QuadShadeData> | QuadVertexData<QuadShadeData>[]
][];
type FinalStairQuadData = [Quad, QuadVertexData<QuadShadeData>][];
type StairShapeState = Record<VoxelFaces, StairQuadData>;
type FinalStairShapeState = Record<VoxelFaces, FinalStairQuadData>;

type QuadShadeData = [
  (AO | BlendedVerticies) | QuadVerticies,
  QuadVerticies | BlendedVerticies
];

type BlendedVerticies = [
  amount: number,
  vertex: QuadVerticies,
  amount: number,
  vertex: QuadVerticies
][];

/**
 * constants
 */
const fullUVs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];
const upHalfUVs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0.5],
  [1, 0.5],
];
const downHalfUVs: QuadUVData = [
  [1, 0.5],
  [0, 0.5],
  [0, 0],
  [1, 0],
];

const upperRightQuaterUvs: QuadUVData = [
  [1, 1],
  [0.5, 1],
  [0.5, 0.5],
  [1, 0.5],
];
const downLeftQuaterUvs: QuadUVData = [
  [0.5, 0.5],
  [0, 0.5],
  [0, 0],
  [0.5, 0],
];

enum AO {
  None = -1,
  Dark = -2,
  ExtraDark = -3,
}
const HalfRight: BlendedVerticies = [
  [1, QuadVerticies.TopRight, 1, QuadVerticies.BottomRight],
];
const HalfLeft: BlendedVerticies = [
  [1, QuadVerticies.TopLeft, 1, QuadVerticies.BottomLeft],
];
const CenterUpLeft: BlendedVerticies = [
  [1, QuadVerticies.TopLeft, 1, QuadVerticies.TopRight],
];
const CenterUpRight: BlendedVerticies = [
  [1, QuadVerticies.TopLeft, 1, QuadVerticies.TopRight],
];
const CenterDownLeft: BlendedVerticies = [
  [1, QuadVerticies.BottomLeft, 1, QuadVerticies.BottomRight],
];
const CenterDownRight: BlendedVerticies = [
  [1, QuadVerticies.BottomLeft, 1, QuadVerticies.BottomRight],
];
const Center: BlendedVerticies = [
  [1, QuadVerticies.BottomLeft, 1, QuadVerticies.BottomRight],
  [1, QuadVerticies.TopLeft, 1, QuadVerticies.TopRight],
];

const tempAO = new QuadScalarVertexData();
const tempLight = new QuadScalarVertexData();

const deg90 = AMath.DegreesToRadians(90);
const deg180 = AMath.DegreesToRadians(180);
const deg270 = AMath.DegreesToRadians(270);
const pivoit: Vec3Array = [0.5, 0.5, 0.5];
const sideFaces = [
  VoxelFaces.North,
  VoxelFaces.South,
  VoxelFaces.West,
  VoxelFaces.East,
];
const upsideDownMatrix = Matrix3x3Like.RotationZ(AMath.DegreesToRadians(180));
const flipMatrix = Matrix3x3Like.Scaling(1, -1, 1);

const createShading = (
  v1: QuadShadeData,
  v2: QuadShadeData,
  v3: QuadShadeData,
  v4: QuadShadeData
) => {
  return new QuadVertexData<QuadShadeData>({
    [QuadVerticies.TopRight]: v1,
    [QuadVerticies.TopLeft]: v2,
    [QuadVerticies.BottomLeft]: v3,
    [QuadVerticies.BottomRight]: v4,
  });
};

const normalShading = createShading(
  [QuadVerticies.TopRight, QuadVerticies.TopRight],
  [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
  [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
  [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
);

const sideDownShade = [
  createShading(
    [HalfRight, HalfRight],
    [HalfLeft, HalfLeft],
    [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
    [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
  ),
  createShading(
    [QuadVerticies.TopRight, QuadVerticies.TopRight],
    [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
    [HalfRight, HalfRight],
    [HalfLeft, HalfLeft]
  ),
];

/**
 * starting shapes
 */
const DefaultStair: StairShapeState = {
  [VoxelFaces.Up]: [
    //up split face
    [
      [
        [0, 0.5, 0],
        [1, 0.5, 0.5],
      ],
      downHalfUVs,
      [
        createShading(
          [AO.Dark, HalfRight],
          [AO.Dark, HalfLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
        //90
        createShading(
          [AO.Dark, CenterDownRight],
          [AO.Dark, CenterUpRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft]
        ),
        //180
        createShading(
          [AO.Dark, HalfRight],
          [AO.Dark, HalfLeft],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [QuadVerticies.TopRight, QuadVerticies.TopRight]
        ),
        //270
        createShading(
          [AO.Dark, CenterUpLeft],
          [AO.Dark, CenterDownLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight],
          [QuadVerticies.TopRight, QuadVerticies.TopRight]
        ),
      ],
    ],
    [
      [
        [0, 1, 0.5],
        [1, 1, 1],
      ],
      upHalfUVs,
      [
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [AO.None, HalfRight],
          [AO.None, HalfLeft]
        ),
        //90
        createShading(
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight],
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [AO.None, CenterUpLeft],
          [AO.None, CenterDownLeft]
        ),
        //180
        createShading(
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [AO.None, HalfLeft],
          [AO.None, HalfRight]
        ),
        //270
        createShading(
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [AO.None, CenterDownLeft],
          [AO.None, CenterUpLeft]
        ),
      ],
    ],
  ],
  [VoxelFaces.Down]: [
    //down full face
    [
      [
        [0, 0, 0],
        [1, 0, 1],
      ],
      fullUVs,
      normalShading,
    ],
  ],
  [VoxelFaces.North]: [
    //north box face
    [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      fullUVs,
      normalShading,
    ],
  ],
  [VoxelFaces.South]: [
    //south split face
    [
      [
        [0, 0, 0],
        [1, 0.5, 0],
      ],
      downHalfUVs,
      [
        createShading(
          [AO.None, HalfRight],
          [AO.None, HalfLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [HalfLeft, HalfLeft],
          [HalfRight, HalfRight]
        ),
      ],
    ],
    [
      [
        [0, 0.5, 0.5],
        [1, 1, 0.5],
      ],
      upHalfUVs,
      [
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [AO.Dark, HalfLeft],
          [AO.Dark, HalfRight]
        ),
        createShading(
          [AO.Dark, HalfRight],
          [AO.Dark, HalfRight],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomRight],
          [QuadVerticies.BottomRight, QuadVerticies.BottomLeft]
        ),
      ],
    ],
  ],
  [VoxelFaces.East]: [
    //east split face
    [
      [
        [1, 0, 0],
        [1, 0.5, 1],
      ],
      downHalfUVs,
      sideDownShade,
    ],
    [
      [
        [1, 0.5, 0.5],
        [1, 1, 1],
      ],
      upperRightQuaterUvs,
      [
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [CenterUpLeft, CenterUpLeft],
          [Center, Center],
          [HalfRight, HalfRight]
        ),
        createShading(
          [HalfRight, HalfRight],
          [Center, Center],
          [CenterDownLeft, CenterDownLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
      ],
    ],
  ],
  [VoxelFaces.West]: [
    //west split face
    [
      [
        [0, 0, 0],
        [0, 0.5, 1],
      ],
      downHalfUVs,
      sideDownShade,
    ],
    [
      [
        [0, 0.5, 0.5],
        [0, 1, 1],
      ],
      downLeftQuaterUvs,
      [
        createShading(
          [CenterUpRight, CenterUpRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [HalfLeft, HalfLeft],
          [Center, Center]
        ),
        createShading(
          [Center, Center],
          [HalfLeft, HalfLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [CenterDownRight, CenterDownRight]
        ),
      ],
    ],
  ],
};

//down north east up right
const DefaultConnectedStair: StairShapeState = {
  [VoxelFaces.Up]: [
    //up split face
    [
      [
        [0, 0.5, 0],
        [1, 0.5, 1],
      ],
      fullUVs,
      createShading(
        [AO.ExtraDark, QuadVerticies.TopRight],
        [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
        [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
        [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
      ),
    ],

    [
      [
        [0.5, 1, 0.5],
        [1, 1, 1],
      ],
      upperRightQuaterUvs,
      createShading(
        [AO.None, QuadVerticies.TopRight],
        [AO.None, QuadVerticies.TopRight],
        [AO.None, Center],
        [AO.None, QuadVerticies.TopRight]
      ),
    ],
  ],
  [VoxelFaces.Down]: [
    //down full face
    [
      [
        [0, 0, 0],
        [1, 0, 1],
      ],
      fullUVs,
      normalShading,
    ],
  ],
  [VoxelFaces.North]: [
    //north box face
    [
      [
        [0, 0, 1],
        [1, 0.5, 1],
      ],
      downHalfUVs,
      sideDownShade,
    ],
    [
      [
        [0.5, 0.5, 1],
        [1, 1, 1],
      ],
      downHalfUVs,
      [
        createShading(
          [CenterUpRight, CenterUpRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [HalfLeft, HalfLeft],
          [Center, Center]
        ),
        createShading(
          [Center, Center],
          [HalfLeft, Center],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [CenterDownRight, CenterDownRight]
        ),
      ],
    ],
  ],
  [VoxelFaces.South]: [
    //south split face
    [
      [
        [0, 0, 0],
        [1, 0.5, 0],
      ],
      downHalfUVs,
      [
        createShading(
          [AO.None, HalfRight],
          [AO.None, HalfLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [AO.None, HalfRight],
          [AO.None, HalfLeft]
        ),
      ],
    ],
    [
      [
        [0.5, 0.5, 0.5],
        [1, 1, 0.5],
      ],
      upperRightQuaterUvs,
      [
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [CenterUpLeft, CenterUpLeft],
          [AO.Dark, Center],
          [AO.Dark, HalfRight]
        ),
        createShading(
          [AO.Dark, HalfRight],
          [AO.Dark, Center],
          [CenterDownLeft, CenterDownLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
      ],
    ],
  ],
  [VoxelFaces.East]: [
    //east split face
    [
      [
        [1, 0, 0],
        [1, 0.5, 1],
      ],
      downHalfUVs,
      sideDownShade,
    ],
    [
      [
        [1, 0.5, 0.5],
        [1, 1, 1],
      ],
      upperRightQuaterUvs,
      [
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [CenterUpLeft, CenterUpLeft],
          [Center, Center],
          [HalfRight, HalfRight]
        ),
        createShading(
          [HalfRight, HalfRight],
          [Center, Center],
          [CenterDownLeft, CenterDownLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
      ],
    ],
  ],
  [VoxelFaces.West]: [
    //west split face
    [
      [
        [0, 0, 0],
        [0, 0.5, 1],
      ],
      downHalfUVs,
      [
        createShading(
          [AO.None, HalfRight],
          [AO.None, HalfLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
        createShading(
          [QuadVerticies.TopRight, QuadVerticies.TopRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [AO.None, HalfRight],
          [AO.None, HalfLeft]
        ),
      ],
    ],
    [
      [
        [0.5, 0.5, 0.5],
        [0.5, 1, 1],
      ],
      downLeftQuaterUvs,
      [
        createShading(
          [CenterUpRight, CenterUpRight],
          [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
          [AO.Dark, HalfLeft],
          [AO.Dark, CenterUpRight]
        ),
        createShading(
          [AO.Dark, HalfLeft],
          [AO.Dark, Center],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomRight],
          [CenterDownRight, CenterDownRight]
        ),
      ],
    ],
  ],
};

/**
 * functions
 */
const mapQuads = (
  quads: StairQuadData,
  orientation: 0 | 1 = 0
): FinalStairQuadData => {
  const final: FinalStairQuadData = [];

  for (const _ of quads) {
    let quad = Quad.Create(_[0], _[1], false, orientation);
    final.push([quad, _[2] as any]);
  }

  return final;
};

const applyMatrix = (
  points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
  scaleMatrix: null | Mat3Array,
  rotationMatrix: [string | null, Mat3Array] | null = null
): any => {
  if (rotationMatrix) {
    points = points.map((vector) => {
      return Vector3Like.RotateAroundPivotArray(
        rotationMatrix[1],
        vector,
        pivoit
      );
    }) as any;
    if (rotationMatrix[0] && rotationMatrix[0] !== "down") {
      points = Quad.OrderQuadVertices(points, rotationMatrix[0] as any);
    }
  }

  if (scaleMatrix) {
    points = points.map((vector) => {
      vector = Vector3Like.ApplyMatrixArray(flipMatrix, vector);
      vector[1] += 1;
      return vector;
    }) as any;
    if (!rotationMatrix || rotationMatrix[0] !== "down")
      points = [points[3], points[2], points[1], points[0]];
  }

  return points;
};

const orderUp = (
  rotation: number,
  shade: QuadVertexData<QuadShadeData>[]
): QuadVertexData<QuadShadeData> => {
  if (rotation == 0) return shade[0];

  if (rotation == deg90) return shade[1];
  if (rotation == deg180) return shade[2];
  if (rotation == deg270) return shade[3];

  return shade[0];
};

const createRototation = (
  rotation: number,
  data: StairShapeState,
  upsideDown = false
) => {
  const matrix = Matrix3x3Like.RotationY(rotation + (upsideDown ? 0 : 0));
  data = structuredClone(data);
  const newData: StairShapeState = {
    [VoxelFaces.Up]: [],
    [VoxelFaces.Down]: data[VoxelFaces.Down],
    [VoxelFaces.North]: [],
    [VoxelFaces.South]: [],
    [VoxelFaces.East]: [],
    [VoxelFaces.West]: [],
  };

  if (!upsideDown) {
    newData[VoxelFaces.Down] = data[VoxelFaces.Down];
    newData[VoxelFaces.Up] = data[VoxelFaces.Up].map((_) => [
      applyMatrix(Quad.CalculateQuadPoints(..._[0]).points, null, [
        null,
        matrix,
      ]) as any,
      _[1],
      Array.isArray(_[2]) ? orderUp(rotation, _[2] as any) : _[2],
    ]);
  } else {
    newData[VoxelFaces.Up] = data[VoxelFaces.Down].map((_) => [
      Quad.OrderQuadVertices(
        applyMatrix(
          Quad.CalculateQuadPoints(..._[0]).points,
          upsideDownMatrix,
          null
        ),
        "up"
      ) as any,
      _[1],
      _[2],
    ]);

    newData[VoxelFaces.Down] = data[VoxelFaces.Up].map((_) => [
      applyMatrix(Quad.CalculateQuadPoints(..._[0]).points, upsideDownMatrix, [
        "up",
        matrix,
      ]) as any,
      _[1],
      Array.isArray(_[2]) ? orderUp(rotation, _[2] as any) : _[2],
    ]);
  }

  for (const face of sideFaces) {
    const newDirection =
      CompassDirectionVoxelFaceMap[
        Directions.Rotate(VoxelFaceCompassDirectionMap[face], rotation)
      ];

    newData[newDirection] = data[face].map((_) => [
      applyMatrix(
        Quad.CalculateQuadPoints(..._[0]).points,
        upsideDown ? upsideDownMatrix : null,
        [VoxelFaceCompassDirectionMap[newDirection], matrix]
      ),
      _[1],
      Array.isArray(_[2]) ? (upsideDown ? _[2][1] : _[2][0]) : _[2],
    ]);
  }

  return {
    [VoxelFaces.Up]: mapQuads(newData[VoxelFaces.Up], 0),
    [VoxelFaces.Down]: mapQuads(newData[VoxelFaces.Down], 1),
    [VoxelFaces.North]: mapQuads(newData[VoxelFaces.North], 1),
    [VoxelFaces.South]: mapQuads(newData[VoxelFaces.South], 0),
    [VoxelFaces.East]: mapQuads(newData[VoxelFaces.East], 0),
    [VoxelFaces.West]: mapQuads(newData[VoxelFaces.West], 1),
  };
};

const getStairQuads = (
  shapeState: number,
  face: VoxelFaces
): FinalStairQuadData => {
  return StairShapeStates[shapeState as StairStates][face];
};

const lightValues: [s: number, r: number, g: number, b: number] = [0, 0, 0, 0];

const updateShaded = (
  vertices: QuadVerticies,
  worldAO: QuadScalarVertexData,
  worldLight: QuadScalarVertexData,
  shaded: QuadVertexData<QuadShadeData>
) => {
  const quadSahdeAO = shaded.vertices[vertices][0];

  if (!Array.isArray(quadSahdeAO)) {
    switch (quadSahdeAO) {
      case AO.None:
        worldAO.vertices[vertices] = 1;
        break;
      case AO.Dark:
        worldAO.vertices[vertices] = 10;
        break;
      case AO.ExtraDark:
        worldAO.vertices[vertices] = 15;
        break;
      default:
        worldAO.vertices[vertices] = tempAO.vertices[quadSahdeAO];
        break;
    }
  } else {
    const length = quadSahdeAO.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
      const shade = quadSahdeAO[i];
      sum += Math.floor(
        (tempAO.vertices[shade[1]] * shade[0] +
          tempAO.vertices[shade[3]] * shade[2]) /
          2
      );
    }
    worldAO.vertices[vertices] = sum / length;
  }

  const quadShadeLight = shaded.vertices[vertices][1];

  if (!Array.isArray(quadShadeLight)) {
    worldLight.vertices[vertices] = tempLight.vertices[quadShadeLight];
  } else {
    lightValues[0] = 0;
    lightValues[1] = 0;
    lightValues[2] = 0;
    lightValues[3] = 0;
    const length = quadShadeLight.length;
    for (let i = 0; i < length; i++) {
      const shade = quadShadeLight[i];
      const v1 = tempLight.vertices[shade[1]] * shade[0];
      const v2 = tempLight.vertices[shade[3]] * shade[2];
      lightValues[0] += Math.ceil(
        (LightData.getS(v1) + LightData.getS(v2)) / 2
      );
      lightValues[1] += Math.ceil(
        (LightData.getR(v1) + LightData.getR(v2)) / 2
      );
      lightValues[2] += Math.ceil(
        (LightData.getG(v1) + LightData.getG(v2)) / 2
      );
      lightValues[3] += Math.ceil(
        (LightData.getB(v1) + LightData.getB(v2)) / 2
      );
    }
    lightValues[0] = Math.ceil(lightValues[0] / length);
    lightValues[1] = Math.ceil(lightValues[1] / length);
    lightValues[2] = Math.ceil(lightValues[2] / length);
    lightValues[3] = Math.ceil(lightValues[3] / length);
    worldLight.vertices[vertices] = LightData.setLightValues(lightValues);
  }
};

/**
 * final
 */
const StairShapeStates: Record<StairStates, FinalStairShapeState> = {
  [StairStates.DownNorth]: createRototation(0, DefaultStair),
  [StairStates.DownSouth]: createRototation(deg180, DefaultStair),
  [StairStates.DownEast]: createRototation(deg90, DefaultStair),
  [StairStates.DownWest]: createRototation(deg270, DefaultStair),
  [StairStates.UpNorth]: createRototation(0, DefaultStair, true),
  [StairStates.UpSouth]: createRototation(deg180, DefaultStair, true),
  [StairStates.UpEast]: createRototation(deg90, DefaultStair, true),
  [StairStates.UpWest]: createRototation(deg270, DefaultStair, true),
  [StairStates.DownNorthEast]: createRototation(0, DefaultConnectedStair),
  [StairStates.DownSouthWest]: createRototation(
    deg180,
    DefaultConnectedStair
  ),
  [StairStates.DownSouthEast]: createRototation(deg90, DefaultConnectedStair),
  [StairStates.DownNorthWest]: createRototation(
    deg270,
    DefaultConnectedStair
  ),
  [StairStates.UpNorthEast]: createRototation(0, DefaultConnectedStair, true),
  [StairStates.UpSouthWest]: createRototation(
    deg180,
    DefaultConnectedStair,
    true
  ),
  [StairStates.UpSouthEast]: createRototation(
    deg90,
    DefaultConnectedStair,
    true
  ),
  [StairStates.UpNorthWest]: createRototation(
    deg270,
    DefaultConnectedStair,
    true
  ),
};

export const addStairQuads = (face: VoxelFaces) => {
  const quads = getStairQuads(ShapeTool.data.voxel.getShapeState(), face);
  const worldLight = ShapeTool.data.getWorldLight();
  const worldAO = ShapeTool.data.getWorldAO();
  tempAO.setFromQuadData(worldAO);
  tempLight.setFromQuadData(worldLight);

  for (const [quad, shaded] of quads) {
    updateShaded(QuadVerticies.TopRight, worldAO, worldLight, shaded);
    updateShaded(QuadVerticies.TopLeft, worldAO, worldLight, shaded);
    updateShaded(QuadVerticies.BottomLeft, worldAO, worldLight, shaded);
    updateShaded(QuadVerticies.BottomRight, worldAO, worldLight, shaded);

    VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, quad);
  }
};
