import Roact from "@rbxts/roact";

export enum ContentCacheType {
	Filesystem,
	Session,
}

export interface DrawingOptions {
	cacheType: ContentCacheType;
	outputWarnings: boolean;
}

export const RootContext = Roact.createContext<DrawingOptions>(undefined!);
