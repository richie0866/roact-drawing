import { CACHE_KEY, GLOBAL_ENV } from "../../constants";
import { ContentCacheType } from "../../contexts/RootContext";

let cache: Record<string, string>;
if (CACHE_KEY in GLOBAL_ENV) {
	cache = GLOBAL_ENV[CACHE_KEY];
} else {
	GLOBAL_ENV[CACHE_KEY] = cache = {};
}

export function getFromCache(url: string, cacheType: ContentCacheType) {
	if (cacheType === ContentCacheType.Session) {
		return cache[url];
	} else if (cacheType === ContentCacheType.Filesystem) {
		return read(url);
	}
}

export function setToCache(url: string, cacheType: ContentCacheType, data: string) {
	if (cacheType === ContentCacheType.Session) {
		cache[url] = data;
	} else if (cacheType === ContentCacheType.Filesystem) {
		write(url, data);
	}
}

function write(url: string, data: string) {
	if (writefile && isfolder && makefolder) {
		if (!isfolder("roact-drawing-cache")) {
			makefolder("roact-drawing-cache");
		}
		writefile(encodeToFilename(url), data);
	}
}

function read(url: string) {
	const path = encodeToFilename(url);

	if (readfile && isfile) {
		return isfile(path) ? readfile(path) : "";
	} else {
		return "";
	}
}

function encodeToFilename(url: string) {
	const [result] = url.gsub("[^a-zA-Z0-9]+", "_");
	return `roact-drawing-cache/${result}.png`;
}
