import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import { ContentCacheType, RootContext } from "../../contexts/RootContext";
import { useViewportSize } from "../../hooks/use-viewport-size";
import MetadataProvider from "../core/MetadataProvider";

export interface Props extends Roact.PropsWithChildren {
	cacheType?: ContentCacheType;
	outputWarnings?: boolean;
}

function Root({ cacheType = ContentCacheType.Filesystem, outputWarnings = true, [Roact.Children]: children }: Props) {
	const resolution = useViewportSize();
	return (
		<RootContext.Provider
			value={{
				cacheType,
				outputWarnings,
			}}
		>
			<MetadataProvider drawing={undefined!} size={resolution} position={new Vector2()}>
				{children}
			</MetadataProvider>
		</RootContext.Provider>
	);
}

export default pure(Root);
