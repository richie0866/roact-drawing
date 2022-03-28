import Roact from "@rbxts/roact";
import { pure, useMemo } from "@rbxts/roact-hooked";

import { DrawingContext } from "../../contexts/DrawingContext";
import { PositionContext } from "../../contexts/PositionContext";
import { SizeContext } from "../../contexts/SizeContext";
import { asBinding } from "../../utils/binding-utils";

interface Props extends Roact.PropsWithChildren {
	drawing: CreatableDrawing;
	size: Roact.Binding<Vector2> | Vector2;
	position: Roact.Binding<Vector2> | Vector2;
}

function MetadataProvider(props: Props) {
	const position = useMemo(() => asBinding(props.position), [props.position]);
	const size = useMemo(() => asBinding(props.size), [props.size]);

	return (
		<DrawingContext.Provider value={props.drawing}>
			<PositionContext.Provider value={position}>
				<SizeContext.Provider value={size}>{props[Roact.Children]}</SizeContext.Provider>
			</PositionContext.Provider>
		</DrawingContext.Provider>
	);
}

export default pure(MetadataProvider);
