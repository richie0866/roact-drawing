import Roact from "@rbxts/roact";

import Drawing, { TextProps } from "../components/Drawing";

interface Props extends Roact.PropsWithChildren {
	$change?: TextProps["$Change"];
	$style?: TextProps;

	text: string | Roact.Binding<string>;
	font?: number | Roact.Binding<number>;
	textSize?: number | Roact.Binding<number>;

	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;

	color?: Color3 | Roact.Binding<Color3>;
	outline?: boolean | Roact.Binding<boolean>;
	outlineColor?: Color3 | Roact.Binding<Color3>;
	opacity?: number | Roact.Binding<number>;
	zIndex?: number | Roact.Binding<number>;
}

export default function Label({
	text = "",
	font = 1,
	textSize = 12,
	position = new UDim2(),
	anchorPoint = new Vector2(),
	color = new Color3(),
	outline,
	outlineColor,
	opacity,
	zIndex,
	$change: onChange,
	$style: style,
	[Roact.Children]: children,
}: Props) {
	return (
		<Drawing.Text
			$Change={onChange}
			Text={text}
			Font={font}
			Size={textSize}
			Position={position}
			AnchorPoint={anchorPoint}
			Color={color}
			Outline={outline}
			OutlineColor={outlineColor}
			Opacity={opacity}
			ZIndex={zIndex}
			{...style}
		>
			{children}
		</Drawing.Text>
	);
}
