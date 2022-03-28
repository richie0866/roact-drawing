import Roact from "@rbxts/roact";
import { hooked, useEffect, useMutable, useState } from "@rbxts/roact-hooked";

import Capture from "../components/core/Capture";
import Drawing from "../components/Drawing";

interface Props {
	icon?: string;
	zIndex?: number;
}

function Cursor({ icon = "rbxassetid://9172873167", zIndex }: Props) {
	const [drawing, setDrawing] = useState<Image>();

	const isMount = useMutable(true);
	useEffect(() => {
		isMount.current = false;
	}, []);

	return (
		<>
			<Drawing.Image
				Url={icon}
				Size={UDim2.fromOffset(64, 64)}
				ZIndex={zIndex}
				Visible={isMount.current ? false : undefined}
			>
				<Drawing.Ref Callback={(drawing) => setDrawing(drawing as Image)} />
			</Drawing.Image>

			<Capture
				onHover={drawing && ((parent) => (drawing.Visible = parent.Visible && true))}
				onLeave={drawing && ((parent) => (drawing.Visible = parent.Visible && false))}
				onMove={(parent, position) => {
					if (drawing && drawing.Visible && parent.Visible) {
						drawing.Position = position.sub(new Vector2(32, 32));
					}
				}}
			/>
		</>
	);
}

export default hooked(Cursor);
