import Roact from "@rbxts/roact";
import { pure, useCallback } from "@rbxts/roact-hooked";

import { useDrawing } from "../../hooks/use-drawing";
import { usePosition } from "../../hooks/use-location";
import { omit } from "../../utils/omit";
import Binder, { DrawingChangeEvents, DrawingProps } from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props extends DrawingProps<Line, "From" | "To" | "Transparency">, Roact.PropsWithChildren {
	$Change?: DrawingChangeEvents<Line>;
	From?: UDim2 | Roact.Binding<UDim2>;
	To?: UDim2 | Roact.Binding<UDim2>;
	Opacity?: number | Roact.Binding<number>;
}

function Line(props: Props) {
	const {
		From = new UDim2(),
		To = new UDim2(),
		Opacity,
		$Change: changeEvents = {},
		[Roact.Children]: children,
	} = props;

	const rest = omit(props, ["From", "To", "Opacity", "$Change", Roact.Children]);

	const drawing = useDrawing("Line");
	const lineBegin = usePosition(From);
	const lineEnd = usePosition(To);

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
			size={Roact.joinBindings([lineBegin, lineEnd]).map(([a, b]) => {
				return new Vector2(b.X - a.X, b.Y - a.Y);
			})}
			position={lineBegin}
		>
			<Binder $onChange={onChange} From={lineBegin} To={lineEnd} Transparency={Opacity} {...rest} />
			{children}
		</MetadataProvider>
	);
}

export default pure(Line);
