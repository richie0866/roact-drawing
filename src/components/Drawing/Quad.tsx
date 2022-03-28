import Roact from "@rbxts/roact";
import { pure, useCallback } from "@rbxts/roact-hooked";

import { useDrawing } from "../../hooks/use-drawing";
import { usePosition } from "../../hooks/use-location";
import { omit } from "../../utils/omit";
import Binder, { DrawingChangeEvents, DrawingProps } from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props
	extends DrawingProps<Quad, "PointA" | "PointB" | "PointC" | "PointD" | "Transparency">,
		Roact.PropsWithChildren {
	$Change?: DrawingChangeEvents<Quad>;
	PointA?: UDim2 | Roact.Binding<UDim2>;
	PointB?: UDim2 | Roact.Binding<UDim2>;
	PointC?: UDim2 | Roact.Binding<UDim2>;
	PointD?: UDim2 | Roact.Binding<UDim2>;
	Opacity?: number | Roact.Binding<number>;
}

function Quad(props: Props) {
	const {
		PointA = new UDim2(),
		PointB = new UDim2(),
		PointC = new UDim2(),
		PointD = new UDim2(),
		Opacity,
		$Change: changeEvents = {},
		[Roact.Children]: children,
	} = props;

	const rest = omit(props, ["PointA", "PointB", "PointC", "PointD", "Opacity", "$Change", Roact.Children]);

	const drawing = useDrawing("Quad");
	const pointA = usePosition(PointA);
	const pointB = usePosition(PointB);
	const pointC = usePosition(PointC);
	const pointD = usePosition(PointD);

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
			size={Roact.joinBindings([pointA, pointB, pointC, pointD]).map(([a, b, c, d]) => {
				const x = math.max(a.X, b.X, c.X, d.X) - math.min(a.X, b.X, c.X, d.X);
				const y = math.max(a.Y, b.Y, c.Y, d.Y) - math.min(a.Y, b.Y, c.Y, d.Y);
				return new Vector2(x, y);
			})}
			position={Roact.joinBindings([pointA, pointB, pointC, pointD]).map(([a, b, c, d]) => {
				const x = math.min(a.X, b.X, c.X, d.X);
				const y = math.min(a.Y, b.Y, c.Y, d.Y);
				return new Vector2(x, y);
			})}
		>
			<Binder
				$onChange={onChange}
				PointA={pointA}
				PointB={pointB}
				PointC={pointC}
				PointD={pointD}
				Transparency={Opacity}
				{...rest}
			/>
			{children}
		</MetadataProvider>
	);
}

export default pure<Props>(Quad);
