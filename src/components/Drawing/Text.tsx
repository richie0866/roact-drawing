import Roact from "@rbxts/roact";
import { pure, useBinding, useCallback } from "@rbxts/roact-hooked";

import { useDrawing } from "../../hooks/use-drawing";
import { useLocation } from "../../hooks/use-location";
import { omit } from "../../utils/omit";
import Binder, { DrawingChangeEvents, DrawingProps } from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props extends DrawingProps<Text, "Position" | "Transparency">, Roact.PropsWithChildren {
	$Change?: DrawingChangeEvents<Text>;
	Position?: UDim2 | Roact.Binding<UDim2>;
	AnchorPoint?: Vector2 | Roact.Binding<Vector2>;
	Opacity?: number | Roact.Binding<number>;
}

function Text(props: Props) {
	const {
		Position = new UDim2(),
		AnchorPoint = new Vector2(),
		Opacity,
		$Change: changeEvents = {},
		[Roact.Children]: children,
	} = props;

	const rest = omit(props, ["Position", "AnchorPoint", "Opacity", "$Change", Roact.Children]);

	const drawing = useDrawing("Text");
	const [bounds, setBounds] = useBinding(new Vector2());
	const [size, position] = useLocation(
		bounds.map((b) => UDim2.fromOffset(b.X, b.Y)),
		Position,
		AnchorPoint,
	);

	const onChange = useCallback(
		(key: keyof typeof drawing, value: unknown) => {
			if (key === "TextBounds") {
				return;
			}

			drawing[key] = value as never;
			changeEvents[key]?.(drawing);

			if (key === "Text" || key === "Font" || key === "Size") {
				setBounds(drawing.TextBounds);
				changeEvents.TextBounds?.(drawing);
			}
		},
		[drawing, changeEvents],
	);

	return (
		<MetadataProvider drawing={drawing} size={size} position={position}>
			<Binder $onChange={onChange} Position={position} Transparency={Opacity} {...rest} />
			{children}
		</MetadataProvider>
	);
}

export default pure(Text);
