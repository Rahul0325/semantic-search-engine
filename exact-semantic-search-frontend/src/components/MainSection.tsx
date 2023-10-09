import React, { useState } from "react";
import {
	LoadingStates,
	SemanticSearchResult,
	WeaviateSearchResult,
	urlFetchDocs,
	urlSemanticSearch,
} from "../constants/constants";
import { Result } from "./Result";

export const MainSection: React.FC = () => {
	const [query, setQuery] = useState<string>();
	const [AiAnswer, setAiAnswer] = useState<SemanticSearchResult | undefined>(undefined);
	const [isLoadingAiAnswer, setIsLoadingAiAnswer] = useState<LoadingStates>("home");

	const [docs, setDocs] = useState<WeaviateSearchResult[] | undefined>(undefined);
	const [isLoadingDocs, setIsLoadingDocs] = useState<LoadingStates>("home");

	const [error, setError] = useState<string | undefined>(undefined);

	const getDocs = async () => {
		const url = urlFetchDocs + query;

		try {
			setIsLoadingDocs("loading");
			const response = await fetch(url);
			if (!response.ok) {
				// TODO: report faulure
				setIsLoadingDocs("error");
				setError(await response.json());
			}
			const data: SemanticSearchResult = await response.json();
			setDocs(data.weaviate_response);
			console.log("THE DOCS ARE: ");
			console.log(data.weaviate_response);
			setIsLoadingDocs("success");
		} catch (error) {
			// TODO: report faulure
			if (error instanceof Error) {
				setIsLoadingDocs("error");
				setError(error.message);
			}
		}
	};

	const getAiAnswer = async () => {
		const url = urlSemanticSearch + query;
		try {
			setIsLoadingAiAnswer("loading");
			const response = await fetch(url);
			if (!response.ok) {
				// TODO: report faulure
				setIsLoadingAiAnswer("error");
				setError(await response.json());
			}
			const data: SemanticSearchResult = await response.json();
			setAiAnswer(data);
			console.log(data.weaviate_response);
			setIsLoadingAiAnswer("success");
		} catch (error) {
			// TODO: report faulure
			if (error instanceof Error) {
				setIsLoadingAiAnswer("error");
				setError(error.message);
			}
		}
	};
	const handleKeyDown = async (event: { key: string }) => {
		if (event.key === "Enter") {
			await getDocs();
			await getAiAnswer();
		}
	};

	return (
		<div className="main-seaction-container">
			<div className="header">
				<img
					className="logo"
					src={
						"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Exact_logo.svg/1280px-Exact_logo.svg.png"
					}
					alt="Logo of Exact"
				/>
				<span>Semantic Search</span>
			</div>
			<div className="search">
				<input
					className="search-bar"
					onKeyDown={handleKeyDown}
					placeholder="How can I help you today?"
					onChange={(e) => setQuery(e.currentTarget.value)}
				></input>
			</div>
			<div className="results">
				{isLoadingDocs === "success" && docs && (
					<Result
						name="vector Search"
						data={AiAnswer}
						docs={docs}
						isLoadingAiAnswer={isLoadingAiAnswer}
					></Result>
				)}
			</div>

			<div>{isLoadingDocs === "loading" && <>{"Fetching the best docs..."}</>}</div>
			<div>{isLoadingDocs === "error" && error}</div>
		</div>
	);
};
