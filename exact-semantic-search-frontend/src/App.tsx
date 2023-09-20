import { useState } from "react";
import "./App.css";
import { Menu, Solutions } from "./components/Menu";
import { MainSection } from "./components/MainSection";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	const [selectedSolution, setSolution] = useState<Solutions | undefined>(undefined);
	const [experimentalMode, setExperimentalMode] = useState<boolean>(false);

	return (
		<ChakraProvider>
			<div className="page">
				<div className="page-menu">
					<Menu
						selectedSolution={selectedSolution}
						setSolution={setSolution}
						experimentalMode={experimentalMode}
						setExperimentalMode={setExperimentalMode}
					></Menu>
				</div>
				<div className="page-content">
					<MainSection></MainSection>
				</div>
			</div>
		</ChakraProvider>
	);
}

export default App;
