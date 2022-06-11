import type { IlluminationManager } from "../IlluminationManager";
export declare function runSunLightRemoveAt(this: typeof IlluminationManager, x: number, y: number, z: number): void;
export declare function runSunLightRemove(this: typeof IlluminationManager): void;
export declare function SunLightAboveCheck(this: typeof IlluminationManager, sl: number, x: number, y: number, z: number): boolean;
export declare function runSunLightUpdate(this: typeof IlluminationManager): void;
export declare function runSunLightUpdateAt(this: typeof IlluminationManager, x: number, y: number, z: number): void;
export declare function PopulateWorldColumnWithSunLight(x: number, z: number, maxY: number): void;
export declare function RunSunLightUpdateAtMaxY(this: typeof IlluminationManager, x: number, z: number, maxY: number): void;