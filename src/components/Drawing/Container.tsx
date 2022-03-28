import Roact from "@rbxts/roact";
import { pure, useCallback } from "@rbxts/roact-hooked";

import { useLocation } from "../../hooks/use-location";
import Binder from "../core/Binder";
import MetadataProvider from "../core/MetadataProvider";

export interface Props extends Roact.PropsWithChildren {
	$Change?: { Size?: (value: Vector2) => void; Position?: (value: Vector2) => void };
	Size?: UDim2 | Roact.Binding<UDim2>;
	Position?: UDim2 | Roact.Binding<UDim2>;
	AnchorPoint?: Vector2 | Roact.Binding<Vector2>;
}

function Container({
	Size = new UDim2(),
	Position = new UDim2(),
	AnchorPoint = new Vector2(),
	$Change: changeEvents = {},
	[Roact.Children]: children,
}: Props) {
	const [size, position] = useLocation(Size, Position, AnchorPoint);

	const onChange = useCallback(
		(key: "Size" | "Position", value: Vector2) => {
			changeEvents[key]?.(value);
		},
		[changeEvents],
	);

	return (
		<MetadataProvider drawing={undefined!} size={size} position={position}>
			<Binder $onChange={onChange} Size={size} Position={position} />
			{children}
		</MetadataProvider>
	);
}

export default pure(Container);
