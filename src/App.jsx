import React,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import authSlice, { login,logout } from "./store/authSlice";
import { Footer, Header } from "./components";

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);


  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? <div className="min-h-screen flex flex-wrap content-between bg-gray-400 text-center">
    <div className="w-full block">
    <Header/>      
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </div>
  </div> : <div> Loading</div>;
}

export default App;
