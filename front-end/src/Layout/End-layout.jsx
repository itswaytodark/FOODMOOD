import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";

const EndLayout = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
        
        </>
    )
}

export default EndLayout;