import Roact from "@rbxts/roact";
import { pure, useCallback } from "@rbxts/roact-hooked";

import { useDrawing } from "../../hooks/use-drawing";
import { usePosition } from "../../hooks/use-location";
import { omit } from "../../utils/omit";
import Binder, { DrawingChangeEvents, DrawingProps } from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props
	extends DrawingProps<Triangle, "PointA" | "PointB" | "PointC" | "Transparency">,
		Roact.PropsWithChildren {
	$Change?: DrawingChangeEvents<Triangle>;
	PointA?: UDim2 | Roact.Binding<UDim2>;
	PointB?: UDim2 | Roact.Binding<UDim2>;
	PointC?: UDim2 | Roact.Binding<UDim2>;
	Opacity?: number | Roact.Binding<number>;
}

function Triangle(props: Props) {
	const {
		PointA = new UDim2(),
		PointB = new UDim2(),
		PointC = new UDim2(),
		Opacity,
		$Change: changeEvents = {},
		[Roact.Children]: children,
	} = props;

	const rest = omit(props, ["PointA", "PointB", "PointC", "Opacity", "$Change", Roact.Children]);

	const drawing = useDrawing("Triangle");
	const pointA = usePosition(PointA);
	const pointB = usePosition(PointB);
	const pointC = usePosition(PointC);

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
			size={Roact.joinBindings([pointA, pointB, pointC]).map(([a, b, c]) => {
				const x = math.max(a.X, b.X, c.X) - math.min(a.X, b.X, c.X);
				const y = math.max(a.Y, b.Y, c.Y) - math.min(a.Y, b.Y, c.Y);
				return new Vector2(x, y);
			})}
			position={Roact.joinBindings([pointA, pointB, pointC]).map(([a, b, c]) => {
				const x = math.min(a.X, b.X, c.X);
				const y = math.min(a.Y, b.Y, c.Y);
				return new Vector2(x, y);
			})}
		>
			<Binder
				$onChange={onChange}
				PointA={pointA}
				PointB={pointB}
				PointC={pointC}
				Transparency={Opacity}
				{...rest}
			/>
			{children}
		</MetadataProvider>
	);
}

export default pure(Triangle);
