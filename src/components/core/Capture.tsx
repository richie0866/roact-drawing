import Roact from "@rbxts/roact";
import { pure, useContext, useEffect, useMutable } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";

import { DrawingContext } from "../../contexts/DrawingContext";
import { PositionContext } from "../../contexts/PositionContext";
import { SizeContext } from "../../contexts/SizeContext";

// Captures input events from Roblox for extended behavior

export interface Props {
	onHover?: (drawing: CreatableDrawing, position: Vector2) => void;
	onLeave?: (drawing: CreatableDrawing, position: Vector2) => void;
	onMove?: (drawing: CreatableDrawing, position: Vector2) => void;
	onClick?: (drawing: CreatableDrawing, position: Vector2) => void;
	onPress?: (drawing: CreatableDrawing, position: Vector2) => void;
	onRelease?: (drawing: CreatableDrawing, position: Vector2) => void;
}

const greaterThan = (a: Vector2, b: Vector2) => a.X > b.X && a.Y > b.Y;

function Capture({ onHover, onLeave, onMove, onClick, onPress, onRelease }: Props) {
	const drawing = useContext(DrawingContext);
	const position = useContext(PositionContext);
	const size = useContext(SizeContext);

	const isHovered = useMutable(false);
	const isPressed = useMutable(false);

	if (!position || !size) {
		warn("The Capture component must be used within a Drawing component!");
	}

	// On hover/leave
	useEffect(() => {
		if (!position || !size || !(onHover || onLeave || onMove)) {
			return;
		}

		// Can't trust and/or for this in Luau
		let isVisible = true;
		if (drawing) {
			isVisible = drawing.Visible;
		}

		const handle = UserInputService.InputChanged.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseMovement || !isVisible) {
				return;
			}

			const mousePosition = UserInputService.GetMouseLocation();
			const isMouseIn =
				greaterThan(mousePosition, position.getValue()) &&
				greaterThan(position.getValue().add(size.getValue()), mousePosition);

			if (isMouseIn && !isHovered.current) {
				isHovered.current = true;
				onHover?.(drawing, mousePosition);
			} else if (!isMouseIn && isHovered.current) {
				isHovered.current = false;
				onLeave?.(drawing, mousePosition);
			}

			if (isMouseIn) {
				onMove?.(drawing, mousePosition);
			}
		});

		return () => {
			handle.Disconnect();
		};
	}, [drawing, size, position, onHover, onLeave, onMove]);

	// On press/release/click
	useEffect(() => {
		if (!position || !size || !(onPress || onRelease || onClick)) {
			return;
		}

		let isVisible = true;
		if (drawing) {
			isVisible = drawing.Visible;
		}

		const handleBegan = UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1 || !isVisible) {
				return;
			}

			const mousePosition = UserInputService.GetMouseLocation();
			const isMouseIn =
				greaterThan(mousePosition, position.getValue()) &&
				greaterThan(position.getValue().add(size.getValue()), mousePosition);

			if (isMouseIn) {
				isPressed.current = true;
				onPress?.(drawing, mousePosition);
			}
		});

		const handleEnded = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1 || !isVisible) {
				return;
			}

			const mousePosition = UserInputService.GetMouseLocation();
			const isMouseIn =
				greaterThan(mousePosition, position.getValue()) &&
				greaterThan(position.getValue().add(size.getValue()), mousePosition);

			if (isMouseIn) {
				onRelease?.(drawing, mousePosition);

				if (isPressed.current) {
					isPressed.current = false;
					onClick?.(drawing, mousePosition);
				}
			}
		});

		return () => {
			handleBegan.Disconnect();
			handleEnded.Disconnect();
		};
	}, [drawing, onClick, onPress, onRelease]);

	return <></>;
}

export default pure(Capture);
