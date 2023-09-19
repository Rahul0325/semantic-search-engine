import React from "react";
import { MenuSection } from "./MenuSection";

export enum Solutions {
	All = "All",
	Accountancy = "Accountancy",
	Manufacturing = "Manufacturing",
	ManufacturingAdvanced = "Manufacturing Advanced",
}

type Props = {
	selectedSolution: Solutions | undefined;
	setSolution: React.Dispatch<React.SetStateAction<Solutions | undefined>>;
	experimentalMode: boolean;
	setExperimentalMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu: React.FC<Props> = (props) => {
	function handleClick() {
		props.setExperimentalMode(!props.experimentalMode);
	}

	return (
		<div className="menu-conatiner">
			<div
				className={`experimental-button ${props.experimentalMode ? "selected" : ""}`}
				onClick={handleClick}
			>
				Experimental Mode
			</div>
			<div className="menu-solution">
				{props.experimentalMode && (
					<MenuSection
						sectionName={"Solutions"}
						selectedSolution={props.selectedSolution}
						setSolution={props.setSolution}
					></MenuSection>
				)}
			</div>
		</div>
	);
};
