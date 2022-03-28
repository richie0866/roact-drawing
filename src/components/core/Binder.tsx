import Roact from "@rbxts/roact";
import { pure, useCallback, useMutable } from "@rbxts/roact-hooked";

import { isBinding } from "../../utils/binding-utils";

export type DrawingProps<T extends BaseDrawing, O extends keyof T> = Partial<Omit<WithBindings<T>, O>>;
export type DrawingChangeEvents<T extends BaseDrawing> = Partial<Record<keyof T, (obj: T) => void>>;

type WithBindings<T> = {
	[K in keyof T]?: T[K] | Roact.Binding<T[K]>;
};
type Bindings = Partial<Record<string, unknown | Roact.Binding<unknown>>>;

type Props = Bindings & {
	$onChange: (key: any, value: any) => void;
};

function Binder(props: Props) {
	const { $onChange: onChange } = props;

	const lastProperties = useMutable({} as Bindings);
	const update = useCallback(
		(key: string, value: unknown) => {
			if (lastProperties.current[key] !== value) {
				lastProperties.current[key] = value;
				onChange(key, value);
			}
			return false;
		},
		[onChange],
	);

	const listeners = new Map<string, Roact.Element>();

	for (const [key, value] of pairs(props as Props)) {
		if (key === "$onChange") {
			continue;
		}
		listeners.set(
			key,
			<frame Visible={isBinding(value) ? value.map((v) => update(key, v)) : update(key, value)} />,
		);
	}

	return <>{listeners}</>;
}

export default pure(Binder);
