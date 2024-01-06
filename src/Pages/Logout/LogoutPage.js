import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(
          "http://localhost:5051/api/user/logout",
          {},
          { withCredentials: true }
        );
        dispatch(logoutSuccess());
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return null;
};

export default LogoutPage;
