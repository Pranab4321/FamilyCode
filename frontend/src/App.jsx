import FamilyForm from "./pages/FamilyForm";
import {Routes, Route} from "react-router-dom"
import IstabhrityForm from "./pages/IstabhrityForm";
import Preview from "./pages/Preview";

const App = ()=>{
  return <>
      <Routes>
        <Route path="/" element={<FamilyForm/>}/>
        <Route path="/istabhrity" element={<IstabhrityForm/>}/>
        <Route path="/preview" element={<Preview/>}/>
      </Routes>  
  </>
}

export default App;