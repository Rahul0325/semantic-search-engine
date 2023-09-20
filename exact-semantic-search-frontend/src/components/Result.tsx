import React from "react";
import { LoadingStates, SemanticSearchResult, WeaviateSearchResult } from "../constants/constants";
import { DocumentResults } from "./DocumentResults";
import { AiResult } from "./AiResult";

type Props = {
	name: string;
	data: SemanticSearchResult | undefined;
	docs: WeaviateSearchResult[] | undefined;
	isLoadingAiAnswer: LoadingStates;
};

export const Result: React.FC<Props> = (props) => {
	return (
		<div className="result-container">
			<div className="result-header">{props.name}</div>
			<div className="ai-result">
				<AiResult
					answer={props.data?.answer}
					isLoadingAiAnswer={props.isLoadingAiAnswer}
				></AiResult>
			</div>
			<div className="document-results">
				<DocumentResults data={props.docs}></DocumentResults>
			</div>
		</div>
	);
};
