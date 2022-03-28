import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

import { PositionContext } from "../contexts/PositionContext";
import { SizeContext } from "../contexts/SizeContext";
import { asBinding } from "../utils/binding-utils";

const round = math.round;

export function useSize(size: UDim2 | Roact.Binding<UDim2>): Roact.Binding<Vector2> {
	const parentSize = useContext(SizeContext);

	const joinedBindings = Roact.joinBindings({
		parentSize: parentSize,
		size: asBinding(size),
	});

	return joinedBindings.map(({ parentSize, size }) => {
		return new Vector2(
			round(size.X.Offset + size.X.Scale * parentSize.X),
			round(size.Y.Offset + size.Y.Scale * parentSize.Y),
		);
	});
}

export function usePosition(position: UDim2 | Roact.Binding<UDim2>): Roact.Binding<Vector2> {
	const parentPosition = useContext(PositionContext);
	const parentSize = useContext(SizeContext);

	const joinedBindings = Roact.joinBindings({
		parentPosition: parentPosition,
		parentSize: parentSize,
		position: asBinding(position),
	});

	return joinedBindings.map(({ parentPosition, parentSize, position }) => {
		return new Vector2(
			round(position.X.Offset + position.X.Scale * parentSize.X + parentPosition.X),
			round(position.Y.Offset + position.Y.Scale * parentSize.Y + parentPosition.Y),
		);
	});
}

export function useLocation(
	size: UDim2 | Roact.Binding<UDim2>,
	position: UDim2 | Roact.Binding<UDim2>,
	anchorScale: Vector2 | Roact.Binding<Vector2> = new Vector2(),
): [size: Roact.Binding<Vector2>, position: Roact.Binding<Vector2>] {
	const parentSize = useContext(SizeContext);
	const parentPosition = useContext(PositionContext);

	const joinedSizeBindings = Roact.joinBindings({
		parentSize: parentSize,
		size: asBinding(size),
	});

	const joinedPositionBindings = Roact.joinBindings({
		parentSize: parentSize,
		parentPosition: parentPosition,
		size: asBinding(size),
		position: asBinding(position),
		anchorScale: asBinding(anchorScale),
	});

	return [
		joinedSizeBindings.map(({ parentSize, size }) => {
			return new Vector2(
				round(size.X.Offset + size.X.Scale * parentSize.X),
				round(size.Y.Offset + size.Y.Scale * parentSize.Y),
			);
		}),
		joinedPositionBindings.map(({ parentPosition, position, parentSize, size, anchorScale }) => {
			const absoluteSize = new Vector2(
				round(size.X.Offset + size.X.Scale * parentSize.X),
				round(size.Y.Offset + size.Y.Scale * parentSize.Y),
			);
			return new Vector2(
				round(
					position.X.Offset +
						position.X.Scale * parentSize.X +
						parentPosition.X -
						anchorScale.X * absoluteSize.X,
				),
				round(
					position.Y.Offset +
						position.Y.Scale * parentSize.Y +
						parentPosition.Y -
						anchorScale.Y * absoluteSize.Y,
				),
			);
		}),
	];
}
