import { SkeletonText } from "@chakra-ui/react";
import React from "react";
import { LoadingStates } from "../constants/constants";

type Props = {
	answer: string | undefined;
	isLoadingAiAnswer: LoadingStates;
};

export const AiResult: React.FC<Props> = (props) => {
	const placeholder = (
		<>
			<div className="skeleton">
				Generating an answer for you...
				<SkeletonText mt="0" noOfLines={10} spacing="4" skeletonHeight="2" />
			</div>{" "}
		</>
	);

	const answer = (
		<>
			{" "}
			<span>Your AI answer: </span>
			<div className="ai-answer-content">{props.answer}</div>
			<span>If you would like to know more, please refer to the documents below.</span>
		</>
	);

	return (
		<div className="ai-result-container box">
			{props.isLoadingAiAnswer === "success" && answer}
			{props.isLoadingAiAnswer === "loading" && placeholder}
		</div>
	);
};
