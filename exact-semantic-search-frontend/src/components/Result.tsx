import React from "react";
import { SemanticSearchResult } from "../constants/constants";
import { DocumentResults } from "./DocumentResults";
import { AiResult } from "./AiResult";

type Props = {
	name: string;
	data: SemanticSearchResult | undefined;
};

export const Result: React.FC<Props> = (props) => {
	return (
		<div className="result-container">
			<div className="result-header">{props.name}</div>
			<div className="ai-result">
				<AiResult answer={props.data?.answer}></AiResult>
			</div>
			<div className="document-results">
				<DocumentResults data={props.data?.weaviate_response}></DocumentResults>
			</div>
		</div>
	);
};
