import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare type DVERInitData = {
    worldWorker: string | Worker;
    builderWorker: string | Worker[];
    fluidBuilderWorker: string | Worker;
    nexusWorker?: string | Worker | null;
} & EngineSettingsData;