import "./style.css"
import Navbar from "./components/nav/nav"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useState } from "react"

function App() {
	
	const [pageIndex, setPageIndex] = useState(0);
	const [pageHovered, setPageHovered] = useState(null);
	const [isOpened, setOpened] = useState(false);
	
	return (
		<PageContext.Provider value={{
			index: pageIndex,
			hover: pageHovered,
			open: isOpened,
		}}>
		
		<SetPageContext.Provider value={{
			setIndex: setPageIndex,
			setHovered: setPageHovered,
			setOpened: setOpened
		}}>
		<Navbar />
		</SetPageContext.Provider>
		
		<Pages/>
		</PageContext.Provider>
	);
}

export default App;
