import { SkeletonText } from "@chakra-ui/react";
import React from "react";
import { LoadingStates } from "../constants/constants";

type Props = {
	answer: string | undefined;
	isLoadingAiAnswer: LoadingStates;
};

export const AiResult: React.FC<Props> = (props) => {
	const answer = (
		<>
			{" "}
			<span>Your AI answer: </span>
			<div className="ai-answer-content">{props.answer}</div>
			<span>If you would like to know more, please refer to the documents below.</span>
		</>
	);
	const placeholder = (
		<>
			<div className="skeleton">
				{props.isLoadingAiAnswer === "loading" && "Generating an answer for you..."}
				<SkeletonText
					mt="0"
					noOfLines={10}
					spacing="4"
					skeletonHeight="2"
					speed={0.5}
					isLoaded={props.isLoadingAiAnswer === "success" ? true : false}
					fadeDuration={1.2}
				>
					{answer}
				</SkeletonText>
			</div>{" "}
		</>
	);

	return (
		<div className="ai-result-container box">
			{props.isLoadingAiAnswer !== "error" && placeholder}
			{props.isLoadingAiAnswer === "error" && <>Sorry, I could not generate your answer :(</>}
		</div>
	);
};
