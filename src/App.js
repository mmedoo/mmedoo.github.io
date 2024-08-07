import "./style.css"
import Navbar from "./components/nav/nav"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useState } from "react"

function App() {
	
	const [pageObjects, setPageObjects] = useState({
		index: 0,
		hover: 0,
		open: false,
	});
	
	return (
		<PageContext.Provider value={pageObjects}>
		
		<SetPageContext.Provider value={setPageObjects}>
		<Navbar />
		</SetPageContext.Provider>
		
		<Pages/>
		</PageContext.Provider>
	);
}

export default App;
