import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../Pages/Login/LoginPage";
import LogoutPage from "../Pages/Logout/LogoutPage";
import CalenderPage from "../Pages/CalenderPage/CalenderPage";
import EmployeesPage from "../Pages/EmployeesPage/EmployeesPage";
import AdminDashboardPage from "../Pages/AdminDashboardPage/AdminDashboardPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MainNavigation from "../Components/UI/MainNavigation/MainNavigation";
import LoadingOverlay from "react-loading-overlay-ts";
import { RingLoader } from "react-spinners";

function Router() {
  const { isLoggedIn, authLoading, fetchingData, userData } = useSelector(
    (state) => state.auth
  );

  const isAdmin = userData && userData.userRole === "Admin";

  if (authLoading) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <LoadingOverlay
        active={fetchingData}
        spinner={
          <RingLoader
            className="fixed-spinner"
            color="#fdf886"
            loading
            size={125}
          />
        }
        styles={{
          overlay: (base) => ({
            ...base,
            position: "fixed",
            height: "100%",
          }),
        }}
      >
        {isLoggedIn && (
          <MainNavigation>
            <Routes>
              <Route
                path="/login"
                element={<Navigate replace to="/calender" />}
              />
              <Route path="/" element={<Navigate replace to="/calender" />} />
              <Route path="/calender" element={<CalenderPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              {isAdmin && (
                <>
                  <Route
                    path="/admin-dashboard"
                    element={<AdminDashboardPage />}
                  />
                </>
              )}
              <Route path="/logout" element={<LogoutPage />} />
              <Route
                path="*"
                element={
                  <ErrorPage
                    header="404 not found"
                    paragraph="Current path is either not valid or your credentials does not give you access to it."
                  />
                }
              />
            </Routes>
          </MainNavigation>
        )}
      </LoadingOverlay>
      {!isLoggedIn && !authLoading && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
