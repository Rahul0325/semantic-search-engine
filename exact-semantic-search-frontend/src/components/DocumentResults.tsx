import React from "react";
import { WeaviateSearchResult } from "../constants/constants";

type Props = {
	data: WeaviateSearchResult[] | undefined;
};

export const DocumentResults: React.FC<Props> = (props) => {
	const formatCertainty = (certainty: number, decimalPlaces: number = 4): string => {
		return (certainty * 100).toFixed(2);
	};

	const handleDivClick = (url: string | undefined) => {
		window.open(url, "_blank");
	};

	return (
		<div className="document-results-container">
			{props.data?.map((doc, index) => (
				<div className="document" key={index} onClick={() => handleDivClick(doc.url)}>
					<div className="document-title">{doc.title}</div>
					<div className="document-content">{doc.content}</div>
					<div className="document-attributes">
						<div className="document-certainty document-attribute">
							{formatCertainty(doc._additional.certainty)}% match
						</div>
						<div className="document-readtime document-attribute">5 min read</div>
					</div>
				</div>
			))}
		</div>
	);
};
