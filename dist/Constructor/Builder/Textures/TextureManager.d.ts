import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types";
import type { TextureTypeUVMap } from "Meta/Render/Textures/Texture.types";
export declare const TextureManager: {
    textureDataHasBeenSet: boolean;
    data: TextureTypeUVMap;
    getTextureUV(data: ConstructorTextureData, overlay?: boolean): number;
    setTextureIndex(data: TextureTypeUVMap): void;
    releaseTextureData(): void;
    isReady(): boolean;
};
