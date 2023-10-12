import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { MainSection } from "./components/MainSection";
import { ChakraProvider } from "@chakra-ui/react";
import { AiModel, SearchMethod, Solutions } from "./constants/constants";

function App() {
	const [experimentalMode, setExperimentalMode] = useState<boolean>(false);
	const [aiModel, setAiModel] = useState<AiModel | undefined>(undefined);
	const [searchMethod, setSearchMethod] = useState<SearchMethod | undefined>(undefined);
	const [solution, setSolution] = useState<Solutions | undefined>(undefined);
	
	return (
		<ChakraProvider>
			<div className="page">
				<div className="page-menu">
					<Menu						
						experimentalMode={experimentalMode}
						setExperimentalMode={setExperimentalMode}
						aiModel={aiModel}
						setAiModel={setAiModel}
						searchMethod={searchMethod}
						setSearchMethod={setSearchMethod}
						solution={solution}
						setSolution={setSolution}
					></Menu>
				</div>
				<div className="page-content">
					<MainSection
						experimentalMode={experimentalMode}
						aiModel={aiModel}
						searchMethod={searchMethod}
						solution={solution}
					></MainSection>
				</div>
			</div>
		</ChakraProvider>
	);
}

export default App;
