export const urlSemanticSearch =
	"https://exact-cs-semantic-search.azurewebsites.net/api/CsSemanticSearch?query=";

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

export interface FeedbackData {
	aiModel?: string;
	aiAnswer?: string;
	documentTitles?: string[];
	feedback?: string;
	isNegativeFeedback?: boolean;
	isBadAnswer?: boolean;
	isBadDocs?: boolean;
	query?: string;
	searchMethod?: string;
}

export type LoadingStates = "loading" | "success" | "error" | "home";

export type AiModel = "ada gpt4" | "cohere Multilingual gpt4" | "cohere Multilingual command"

export type SearchMethod = "vector" | "hybrid"

export type Solutions = "All" | "Accountancy" | "Manufacturing"