import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const Navigate=useNavigate();  
  const logoutHanndler = () => {
     authService.logout().then(()=>{
       dispatch(logout());
       Navigate("/");
     })
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    onClick={logoutHanndler}>
      Logout
    </button>
  );
}

export default LogoutBtn;
