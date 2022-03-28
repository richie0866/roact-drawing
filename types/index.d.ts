/// <reference types="@rbxts/types/plugin"/>

// Environment

declare const getgenv: (() => Record<string, any>) | undefined;
declare const readfile: ((path: string) => string | undefined) | undefined;
declare const writefile: ((path: string, content: string) => void) | undefined;
declare const isfolder: ((path: string) => boolean) | undefined;
declare const makefolder: ((path: string) => void) | undefined;

// RobloxScriptSecurity

interface DataModel {
	/**
	 * Sends a HTTP GET request to the given URL and returns the response body.
	 *
	 * Tags: Yields, RobloxScriptSecurity
	 */
	HttpGetAsync(
		this: DataModel,
		url: string,
		httpRequestType?: Enum.HttpRequestType,
	): LuaTuple<[data: string, code: number]>;
	/**
	 * The HttpPostAsync function performs a POST request to the specified url, using the specified data, and the specified contentType.
	 *
	 * Tags: Yields, RobloxScriptSecurity
	 */
	HttpPostAsync(
		this: DataModel,
		url: string,
		data: string,
		contentType?: string,
		httpRequestType?: Enum.HttpRequestType,
	): string;
}

// Drawing library

type Drawing = {
	new <T extends keyof CreatableDrawings>(drawingType: T): CreatableDrawings[T];
	readonly Fonts: {
		UI: 0;
		System: 1;
		Plex: 2;
		Monospace: 3;
	};
};

declare const Drawing: Drawing | undefined;

interface CreatableDrawings {
	Line: Line;
	Text: Text;
	Image: Image;
	Circle: Circle;
	Square: Square;
	Quad: Quad;
	Triangle: Triangle;
}

type CreatableDrawing = CreatableDrawings[keyof CreatableDrawings];

interface BaseDrawing {
	Visible: boolean;
	ZIndex: number;
	Transparency: number;
	Color: Color3;
	Remove(): void;
}

interface Line extends BaseDrawing {
	Thickness: number;
	From: Vector2;
	To: Vector2;
}

interface Text extends BaseDrawing {
	Text: string;
	readonly TextBounds: Vector2;
	Size: number;
	Center: boolean;
	Outline: boolean;
	OutlineColor: Color3;
	Position: Vector2;
	Font: number;
}

interface Image extends BaseDrawing {
	Data: string;
	Size: Vector2;
	Position: Vector2;
	Rounding: number;
}

interface Circle extends BaseDrawing {
	Thickness: number;
	NumSides: number;
	Radius: number;
	Filled: boolean;
	Position: Vector2;
}

interface Square extends BaseDrawing {
	Thickness: number;
	Size: Vector2;
	Position: Vector2;
	Filled: boolean;
}

interface Quad extends BaseDrawing {
	Thickness: number;
	PointA: Vector2;
	PointB: Vector2;
	PointC: Vector2;
	PointD: Vector2;
	Filled: boolean;
}

interface Triangle extends BaseDrawing {
	Thickness: number;
	PointA: Vector2;
	PointB: Vector2;
	PointC: Vector2;
	Filled: boolean;
}
