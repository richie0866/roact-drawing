import { useEffect, useMemo } from "@rbxts/roact-hooked";

import { MockDrawing } from "../helpers/MockDrawing";

const drawings = new Set<CreatableDrawing>();

export function useDrawing<T extends keyof CreatableDrawings>(drawingType: T): CreatableDrawings[T] {
	const drawing = useMemo<CreatableDrawings[T]>(() => {
		const obj = Drawing ? new Drawing(drawingType) : (new MockDrawing(drawingType) as never);

		obj.Visible = true;
		drawings.add(obj);

		return obj;
	}, [drawingType]);

	useEffect(() => {
		return () => {
			drawings.delete(drawing);
			drawing.Remove();
		};
	}, [drawing]);

	return drawing;
}

export function getDrawings() {
	return drawings;
}
