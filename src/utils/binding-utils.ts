import Roact from "@rbxts/roact";

export function isBinding(binding: unknown): binding is Roact.Binding<unknown> {
	return typeIs(binding, "table") && "getValue" in binding;
}

export function mapBinding<T, U>(value: T | Roact.Binding<T>, transform: (value: T) => U): Roact.Binding<U> {
	return isBinding(value) ? value.map(transform) : Roact.createBinding(transform(value))[0];
}

export function asBinding<T>(value: T | Roact.Binding<T>): Roact.Binding<T> {
	return isBinding(value) ? value : Roact.createBinding(value)[0];
}

export function getBindingValue<T>(value: T | Roact.Binding<T>): T {
	return isBinding(value) ? value.getValue() : value;
}
