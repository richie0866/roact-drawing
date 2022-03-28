import { useContext, useEffect, useMemo, useState } from "@rbxts/roact-hooked";

import { RootContext } from "../../contexts/RootContext";
import { getFromCache } from "./cache";
import { fetchContent } from "./fetch-content";
import { resolveAssetId } from "./resolve-asset-id";

export function useContent(asset: string) {
	const options = useContext(RootContext);
	const url = useMemo(() => resolveAssetId(asset), [asset]);

	const [content, setContent] = useState<string>(() => getFromCache(url, options.cacheType) ?? "");

	useEffect(() => {
		const promise = fetchContent(url, options)
			.then(setContent)
			.catch((err) => options.outputWarnings && warn(`[useContent] ${err}`));

		return () => promise.cancel();
	}, [url, options.cacheType]);

	return content;
}
