import { Route, Routes } from "react-router-dom"
import EndLayout from "../Layout/End-layout"
import { Homepage } from "../Pages/Home"
import { CartPage } from "../Pages/CartPage"
import { ContactUs } from "../Pages/contactpage"

const EndRoute = () => {

  return (
    
    <Routes>
      <Route element={<EndLayout/>}>

      <Route path="/" element={<Homepage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/contact" element={<ContactUs/>} />
      
      </Route>
    </Routes>

    )
}

export default EndRoute