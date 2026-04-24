import { Route, Routes } from "react-router-dom"
import RuleTable from "./Components/Rules/RuleTable"
import TextProcessor from "./Components/TextProcessor/TextProcessor"

function App() {
  
  return (
    <>
     <Routes>
          <Route path="/" element={<RuleTable />} />
          <Route path="/TextProcessor" element={<TextProcessor />} />
     </Routes>
    </>
  )
}

export default App
