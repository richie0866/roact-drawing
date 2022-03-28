export function resolveAssetId(url: string) {
	if (url.match("^rbxassetid://")[0] !== undefined) {
		return "https://assetdelivery.roblox.com/v1/asset/?id=" + url.gsub("rbxassetid://", "")[0];
	}
	return url;
}
