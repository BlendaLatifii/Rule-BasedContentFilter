import { Route, Routes } from "react-router-dom"
import AddRule from "./Components/AddRule"
import RuleTable from "./Components/RuleTable"

function App() {


  return (
    <>
     <Routes>
          <Route path="/" element={<AddRule closeModal= {false} />} />
          <Route path="/RuleTable" element={<RuleTable />} />
     </Routes>
    </>
  )
}

export default App
