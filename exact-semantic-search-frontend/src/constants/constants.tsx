// export const urlSemanticSearch =
// 	"https://exact-cs-semantic-search.azurewebsites.net/api/CsSemanticSearch?query=";

export const urlSemanticSearch =
	"https://command-center-functions.azurewebsites.net/api/support-copilot-claude?query=";

export const urlFetchDocs =
	"https://exact-cs-semantic-search.azurewebsites.net/api/FetchDocs?query=";

export interface SemanticSearchResult {
	answer: string;
	weaviate_response: WeaviateSearchResult[];
}

export interface WeaviateSearchResult {
	_additional: {
		certainty: number;
		distance: number;
	};
	content: string;
	title: string;
	url: string | undefined;
}

export type LoadingStates = "loading" | "success" | "error" | "home";
