import React, { useEffect, useState } from "react";
import {
	AiModel,
	FeedbackData,
	LoadingStates,
	SearchMethod,
	SemanticSearchResult,
	Solutions,
	WeaviateSearchResult,
	urlFetchDocs,
	urlSemanticSearch,
} from "../constants/constants";
import { Result } from "./Result";

type Props = {
	experimentalMode: boolean;
	aiModel: AiModel | undefined;
	searchMethod: SearchMethod | undefined;
	solution: Solutions | undefined
}

export const MainSection: React.FC<Props> = (props) => {
	const [query, setQuery] = useState<string>();
	const [aiAnswer, setAiAnswer] = useState<SemanticSearchResult | undefined>(undefined);
	const [feedbackData, setFeedbackData] = useState<FeedbackData>({});

	const [isLoadingAiAnswer, setIsLoadingAiAnswer] = useState<LoadingStates>("home");

	const [docs, setDocs] = useState<WeaviateSearchResult[] | undefined>(undefined);
	const [isLoadingDocs, setIsLoadingDocs] = useState<LoadingStates>("home");

	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		 if (isLoadingAiAnswer === "success") {
			const _newFeedbackData: FeedbackData = {
				...feedbackData,				
				query: query, 
				aiModel: props.aiModel ?? "ada gpt4", 
				documentTitles: docs?.map(_doc => _doc.title), 
				searchMethod: props.searchMethod ?? "vector", 
				aiAnswer: aiAnswer?.answer
			}
			setFeedbackData(_newFeedbackData)
		 }
	}, [isLoadingAiAnswer])

	const getDocs = async () => {
		let url = urlFetchDocs + query;
		
		if (props.experimentalMode) {
			props.aiModel ? url += `&aimodel=${props.aiModel}` : ""
			props.searchMethod ? url += `&searchmethod=${props.searchMethod}` : ""	
		}

		try {
			setIsLoadingDocs("loading");	
			console.log(url)		
			const response = await fetch(url);
			if (!response.ok) {
				// TODO: report faulure
				setIsLoadingDocs("error");
				setError(await response.json());
			}
			const data: SemanticSearchResult = await response.json();
			setDocs(data.weaviate_response);
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
						query={query}
						data={aiAnswer}
						docs={docs}
						isLoadingAiAnswer={isLoadingAiAnswer}
						feedbackData={feedbackData}
						setFeedbackData={setFeedbackData}
					></Result>
				)}
			</div>

			<div>{isLoadingDocs === "loading" && <>{"Fetching the best docs..."}</>}</div>
			<div>{isLoadingDocs === "error" && error}</div>
		</div>
	);
};
