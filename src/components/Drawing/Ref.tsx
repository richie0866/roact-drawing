import Roact from "@rbxts/roact";
import { hooked, useContext, useEffect } from "@rbxts/roact-hooked";

import { DrawingContext } from "../../contexts/DrawingContext";

export interface Props {
	Callback: (drawing: CreatableDrawing) => void;
}

function Ref(props: Props) {
	const drawing = useContext(DrawingContext);

	useEffect(() => {
		props.Callback(drawing);
	}, [drawing]);

	return <></>;
}

export default hooked(Ref);
