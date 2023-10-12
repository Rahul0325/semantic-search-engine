import React from "react";
import { FeedbackData, LoadingStates, SemanticSearchResult, WeaviateSearchResult } from "../constants/constants";
import { DocumentResults } from "./DocumentResults";
import { AiResult } from "./AiResult";

type Props = {
	query: string | undefined;
	data: SemanticSearchResult | undefined;
	docs: WeaviateSearchResult[] | undefined;
	isLoadingAiAnswer: LoadingStates;
	feedbackData: FeedbackData;
	setFeedbackData: React.Dispatch<React.SetStateAction<FeedbackData>>
};

export const Result: React.FC<Props> = (props) => {
	return (
		<div className="result-container">
			<div className="result-header">{`AI model used: ${props.feedbackData.aiModel ?? "default"}`}</div>
			<div className="result-header">{`Search method used: ${props.feedbackData.searchMethod ?? "default"}`}</div>

			<div className="ai-result">
				<AiResult
					answer={props.data?.answer}
					isLoadingAiAnswer={props.isLoadingAiAnswer}
					feedbackData={props.feedbackData}
					setFeedbackData={props.setFeedbackData}
				></AiResult>
			</div>
			<div className="document-results">
				<DocumentResults data={props.docs}></DocumentResults>
			</div>
		</div>
	);
};
