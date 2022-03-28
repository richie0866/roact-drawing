import Roact from "@rbxts/roact";
import { pure, useCallback } from "@rbxts/roact-hooked";

import { useDrawing } from "../../hooks/use-drawing";
import { useLocation } from "../../hooks/use-location";
import { omit } from "../../utils/omit";
import Binder, { DrawingChangeEvents, DrawingProps } from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props extends DrawingProps<Square, "Size" | "Position" | "Transparency">, Roact.PropsWithChildren {
	$Change?: DrawingChangeEvents<Square>;
	Size?: UDim2 | Roact.Binding<UDim2>;
	Position?: UDim2 | Roact.Binding<UDim2>;
	AnchorPoint?: Vector2 | Roact.Binding<Vector2>;
	Opacity?: number | Roact.Binding<number>;
}

function Square(props: Props) {
	const {
		Size = new UDim2(),
		Position = new UDim2(),
		AnchorPoint = new Vector2(),
		Opacity,
		$Change: changeEvents = {},
		[Roact.Children]: children,
	} = props;

	const rest = omit(props, ["Size", "Position", "AnchorPoint", "Opacity", "$Change", Roact.Children]);

	const drawing = useDrawing("Square");
	const [size, position] = useLocation(Size, Position, AnchorPoint);

	const onChange = useCallback(
		(key: keyof typeof drawing, value: unknown) => {
			drawing[key] = value as never;
			changeEvents[key]?.(drawing);
		},
		[drawing, changeEvents],
	);

	return (
		<MetadataProvider drawing={drawing} size={size} position={position}>
			<Binder $onChange={onChange} Size={size} Position={position} Transparency={Opacity} {...rest} />
			{children}
		</MetadataProvider>
	);
}

export default pure(Square);
