import Roact from "@rbxts/roact";
import { pure, useCallback } from "@rbxts/roact-hooked";

import { useDrawing } from "../../hooks/use-drawing";
import { useLocation } from "../../hooks/use-location";
import { mapBinding } from "../../utils/binding-utils";
import { omit } from "../../utils/omit";
import Binder, { DrawingChangeEvents, DrawingProps } from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props extends DrawingProps<Circle, "Radius" | "Position" | "Transparency">, Roact.PropsWithChildren {
	$Change?: DrawingChangeEvents<Circle>;
	Size?: UDim | Roact.Binding<UDim>;
	Position?: UDim2 | Roact.Binding<UDim2>;
	AnchorPoint?: Vector2 | Roact.Binding<Vector2>;
	Opacity?: number | Roact.Binding<number>;
}

function Circle(props: Props) {
	const {
		Size = new UDim(),
		Position = new UDim2(),
		AnchorPoint = new Vector2(),
		Opacity,
		$Change: changeEvents = {},
		[Roact.Children]: children,
	} = props;

	const rest = omit(props, ["Size", "Position", "AnchorPoint", "Opacity", "$Change", Roact.Children]);

	const drawing = useDrawing("Circle");
	const [size, position] = useLocation(
		mapBinding(Size, (r) => new UDim2(r, r)),
		Position,
		mapBinding(AnchorPoint, (v) => new Vector2(v.X - 0.5, v.Y - 0.5)),
	);

	const onChange = useCallback(
		(key: keyof typeof drawing, value: unknown) => {
			drawing[key] = value as never;
			changeEvents[key]?.(drawing);
		},
		[drawing, changeEvents],
	);

	return (
		<MetadataProvider
			drawing={drawing}
			size={size.map((s) => new Vector2(math.min(s.X, s.Y), math.min(s.X, s.Y)))}
			position={position}
		>
			<Binder
				$onChange={onChange}
				Radius={size.map((s) => math.min(s.X, s.Y) / 2)}
				Position={position}
				Transparency={Opacity}
				{...rest}
			/>
			{children}
		</MetadataProvider>
	);
}

export default pure(Circle);
