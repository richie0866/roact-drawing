import { DrawingOptions } from "../../contexts/RootContext";
import http from "../../utils/http";
import { setToCache } from "./cache";

async function fetchContentInternal(url: string, options: DrawingOptions) {
	const [data, code] = await http.get(url);

	if (data === undefined || data.size() === 0) {
		if (options.outputWarnings) {
			warn(`Failed to fetch content from ${url} (${code})`);
		}

		task.wait(3); // Wait for next retry

		throw `Failed to load content from ${url}: Status code ${code}`;
	}

	return data;
}

export async function fetchContent(url: string, options: DrawingOptions): Promise<string> {
	const data = await Promise.retry(fetchContentInternal, 5, url, options);

	task.spawn(() => {
		setToCache(url, options.cacheType, data);
	});

	return data;
}
