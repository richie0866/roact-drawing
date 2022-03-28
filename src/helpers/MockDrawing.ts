const drawings = new Map<string, MockDrawing>();

let drawingId = 0;

export class MockDrawing {
	readonly id: string;
	readonly drawingType: keyof CreatableDrawings;

	constructor(drawingType: keyof CreatableDrawings) {
		this.id = `${drawingType}-${drawingId++}`;
		this.drawingType = drawingType;

		print(`New MockDrawing ${this.id}`);
		drawings.set(this.id, this);
	}

	Remove() {
		print(`MockDrawing.Remove() called for ${this.id}`);
		drawings.delete(this.id);
	}
}
