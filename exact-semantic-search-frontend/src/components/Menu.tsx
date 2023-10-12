import React, { useEffect } from "react";
import { MenuSection } from "./MenuSection";
import { AiModel, SearchMethod, Solutions } from "../constants/constants";

// export enum Solutions {
// 	All = "All",
// 	Accountancy = "Accountancy",
// 	Manufacturing = "Manufacturing",
// 	ManufacturingAdvanced = "Manufacturing Advanced",
// }

type Props = {
	experimentalMode: boolean;
	setExperimentalMode: React.Dispatch<React.SetStateAction<boolean>>;
	aiModel: AiModel | undefined;
	setAiModel: React.Dispatch<React.SetStateAction<AiModel | undefined>> 
	searchMethod: SearchMethod | undefined;
	setSearchMethod: React.Dispatch<React.SetStateAction<SearchMethod | undefined>> 
	solution: Solutions | undefined;
	setSolution: React.Dispatch<React.SetStateAction<Solutions | undefined>>;
};

const allowedAiModels: AiModel[] = ["ada gpt4" , "cohere Multilingual gpt4" , "cohere Multilingual command"]
const allowedSearchMethods: SearchMethod[] = ["vector" , "hybrid"]

export const Menu: React.FC<Props> = (props) => {
	function handleClick() {
		props.setExperimentalMode(!props.experimentalMode);
	}

	useEffect(() => {
		if (!props.experimentalMode) {
			props.setAiModel(undefined);
			props.setSearchMethod(undefined);
			props.setSolution(undefined)
		}
	}, [props.experimentalMode])

	return (
		<div className="menu-conatiner">
			<div className={`button ${props.experimentalMode ? "selected" : ""}`} onClick={handleClick}>
				Experimental Mode
			</div>
			<div className="menu-solution">
				{props.experimentalMode && (
					<>
					<MenuSection
						title={"Ai Models"}
						menuOptions={allowedAiModels}
						selectedOption={props.aiModel}
						setSelectedOption={props.setAiModel}
					></MenuSection>
					<MenuSection
						title={"Search Method"}
						menuOptions={allowedSearchMethods}
						selectedOption={props.searchMethod}
						setSelectedOption={props.setSearchMethod}
					></MenuSection>
					</>
				)}
			</div>
		</div>
	);
};

