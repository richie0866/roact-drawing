namespace http {
	export async function get(url: string, requestType?: Enum.HttpRequestType): Promise<[string?, number?]> {
		const [data, code] = game.HttpGetAsync(url, requestType);
		return [data, code];
	}

	export async function post(
		url: string,
		data: string,
		contentType?: string,
		requestType?: Enum.HttpRequestType,
	): Promise<string> {
		return game.HttpPostAsync(url, data, contentType, requestType);
	}
}

export default http;
