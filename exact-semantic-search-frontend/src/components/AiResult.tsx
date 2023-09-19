import React from "react";

type Props = {
	answer: string | undefined;
};

export const AiResult: React.FC<Props> = (props) => {
	return (
		<div className="ai-result-container box">
			<span>Your AI answer: </span>
			<div className="ai-answer-content">{props.answer}</div>
			<span>If you would like to know more, please refer to the documents below.</span>
		</div>
	);
};
