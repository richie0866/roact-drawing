import Roact from "@rbxts/roact";

import Capture, { Props as CaptureProps } from "../components/core/Capture";
import Drawing, { SquareProps } from "../components/Drawing";

export interface Props extends Roact.PropsWithChildren {
	$input?: CaptureProps;
	$change?: SquareProps["$Change"];
	$style?: SquareProps;

	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;

	color?: Color3 | Roact.Binding<Color3>;
	opacity?: number | Roact.Binding<number>;
	filled?: boolean | Roact.Binding<boolean>;
	zIndex?: number | Roact.Binding<number>;
}

export default function Button({
	filled = true,
	size = UDim2.fromOffset(64, 64),
	position = new UDim2(),
	anchorPoint = new Vector2(),
	color = new Color3(1, 1, 1),
	opacity,
	zIndex,
	$input: onInput,
	$change: onChange,
	$style: style,
	[Roact.Children]: children,
}: Props) {
	return (
		<Drawing.Square
			Filled={filled}
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			Color={color}
			Opacity={opacity}
			ZIndex={zIndex}
			$Change={onChange}
			{...style}
		>
			<Capture {...onInput} />
			{children}
		</Drawing.Square>
	);
}
