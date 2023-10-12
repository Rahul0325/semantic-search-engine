import React, { useEffect } from "react";
import { AiModel, SearchMethod, Solutions } from "../constants/constants";

type Props = {
	title: string;
	menuOptions: string[]
	selectedOption: Solutions | AiModel | SearchMethod | undefined;
	setSelectedOption: React.Dispatch<React.SetStateAction<any | undefined>>;
};

export const MenuSection: React.FC<Props> = (props) => {
	useEffect(() => {
		console.log(props.selectedOption);
	}, [props.selectedOption]);

	return (
		<div>
			<span>{props.title}</span>
			<ul>
				{props.menuOptions.map((label, index) => (
					<li
						id={`${index}`}
						key={index}
						className={props.selectedOption === label ? "selected" : ""}
						onClick={() => {
							if (props.selectedOption === label && props.selectedOption !== undefined) {
								props.setSelectedOption(undefined);
							} else {
								props.setSelectedOption(label);
							}
						}}
					>
						{label}
					</li>
				))}
			</ul>
		</div>
	);
};
