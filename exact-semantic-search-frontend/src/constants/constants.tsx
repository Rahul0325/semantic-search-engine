export const urlSemanticSearch =
	"https://cssemanticsearch-hotfix.azurewebsites.net/api/cssemanticsearch?query=";

export const urlFetchDocs =
	"https://cssemanticsearch-hotfix.azurewebsites.net/api/fetchdocs?query=";

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
