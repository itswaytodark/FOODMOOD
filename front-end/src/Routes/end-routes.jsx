import { Route, Routes } from "react-router-dom"
import EndLayout from "../Layout/End-layout"
import { Homepage } from "../Pages/Home"
import { CartPage } from "../Pages/CartPage"

const EndRoute = () => {

  return (
    
    <Routes>
      <Route element={<EndLayout/>}>

      <Route path="/" element={<Homepage/>} />
      <Route path="/cart" element={<CartPage/>} />
      
      </Route>
    </Routes>

    )
}

export default EndRoute