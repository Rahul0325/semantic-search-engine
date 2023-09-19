import React, { useState } from "react";
import { LoadingStates, SemanticSearchResult, urlSemanticSearch } from "../constants/constants";
import { Result } from "./Result";

export const MainSection: React.FC = () => {
	const [query, setQuery] = useState<string>();
	const [data, setData] = useState<SemanticSearchResult | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<LoadingStates>("home");
	const [error, setError] = useState<string | undefined>(undefined);

	const handleKeyDown = async (event: { key: string }) => {
		if (event.key === "Enter") {
			const url = urlSemanticSearch + query;
			try {
				setIsLoading("loading");
				const response = await fetch(url);
				if (!response.ok) {
					// TODO: report faulure
					setIsLoading("error");
					setError(await response.json());
				}
				const data: SemanticSearchResult = await response.json();
				setData(data);
				console.log(data.weaviate_response);
				setIsLoading("success");
			} catch (error) {
				// TODO: report faulure
				if (error instanceof Error) {
					setIsLoading("error");
					setError(error.message);
				}
			}
		}
	};

	return (
		<div className="main-seaction-container">
			<div className="header">Exact Semantic Search</div>
			<div className="search">
				<input
					className="search-bar"
					onKeyDown={handleKeyDown}
					placeholder="How can I help you today?"
					onChange={(e) => setQuery(e.currentTarget.value)}
				></input>
			</div>
			<div className="results">
				{isLoading === "success" && data && <Result name="vector Search" data={data}></Result>}
			</div>

			<div>{isLoading === "loading" && "Im fetching your results..."}</div>
			<div>{isLoading === "error" && error}</div>
		</div>
	);
};
