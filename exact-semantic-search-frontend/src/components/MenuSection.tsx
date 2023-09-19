import React, { useEffect } from "react";
import { Solutions } from "./Menu";

type Props = {
	sectionName: string;
	selectedSolution: Solutions | undefined;
	setSolution: React.Dispatch<React.SetStateAction<Solutions | undefined>>;
};

export const MenuSection: React.FC<Props> = (props) => {
	useEffect(() => {
		console.log(props.selectedSolution);
	}, [props.selectedSolution]);

	return (
		<div>
			<span>{props.sectionName}</span>
			<ul>
				{Object.values(Solutions).map((label, index) => (
					<li
						id={`${index}`}
						key={index}
						className={props.selectedSolution === label ? "selected" : ""}
						onClick={() => {
							if (props.selectedSolution === label && props.selectedSolution !== undefined) {
								props.setSolution(undefined);
							} else {
								props.setSolution(label);
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
