import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "./store/slices/authSlice";
import Router from "./Router/Router";
import { ToastContainer } from "react-toastify";
import { formatDateToLongString } from "./Utils/string-utils";
import ApiService from "./Services/ApiService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = () => {
      ApiService.validateAuth(false)
        .then((response) => {
          response.data.hiredDate = formatDateToLongString(
            response.data.hiredDate
          );
          dispatch(loginSuccess(response.data));
        })
        .catch((err) => {
          dispatch(logoutSuccess());
        });
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
        theme="light"
      />
    </>
  );
}

export default App;
