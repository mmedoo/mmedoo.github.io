import "./style.css"
import Navbar from "./components/nav/nav"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useState } from "react"

function App() {

  const [pageIndex, setPageIndex] = useState(0);
  
  return (
    <PageContext.Provider value={pageIndex}>
      
      <SetPageContext.Provider value={setPageIndex}>
        <Navbar />
      </SetPageContext.Provider>

      <Pages/>
    </PageContext.Provider>
  );
}

export default App;
