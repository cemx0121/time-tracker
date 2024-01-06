import http from "./http-service";

class ApiService {
  getAllProfiles(showToast = true) {
    return http.get("http://localhost:5051/api/user/all-profiles", {
      showToast,
    });
  }

  updateUserProfile(updatedData, showToast = true) {
    return http.put(
      "http://localhost:5051/api/user/update/profile",
      updatedData,
      { showToast }
    );
  }

  // API FUNCTIONS FOR LOGIN AND VALIDATING AT PAGE REFRESH
  validateAuth(showToast = true) {
    return http.get("http://localhost:5051/api/user/validate-auth", {
      showToast,
    });
  }

  login(userCredentials, showToast = true) {
    return http.post("http://localhost:5051/api/user/login", userCredentials, {
      showToast,
    });
  }

  // API FUNCTIONS FOR REGISTERING
  register(registerData, showToast = true) {
    return http.post("http://localhost:5051/api/user/register", registerData, {
      showToast,
    });
  }

  getJobPositions(showToast = true) {
    return http.get("http://localhost:5051/api/jobpositions", {
      showToast,
    });
  }

  // API FUNCTIONS FOR CRUD FOR WORKSHIFTS
  getWorkShiftsForDate(date, showToast = true) {
    date.setHours(23, 59, 59);
    const formattedDate = date.toISOString().split("T")[0];
    return http.get(`http://localhost:5051/api/workshift/${formattedDate}`, {
      showToast,
    });
  }

  addWorkShift(newWorkShift, showToast = true) {
    return http.post("http://localhost:5051/api/workshift", newWorkShift, {
      showToast,
    });
  }

  updateWorkShift(workShiftId, updatedData, showToast = true) {
    return http.put(
      `http://localhost:5051/api/workshift/${workShiftId}`,
      updatedData,
      {
        showToast,
      }
    );
  }

  deleteWorkShift(workShiftId, showToast = true) {
    return http.delete(`http://localhost:5051/api/workshift/${workShiftId}`, {
      showToast,
    });
  }

  getUsersWeeklyWorkShifts(year, weekNumber, showToast = true) {
    return http.get(
      `http://localhost:5051/api/workshift/week/${year}/${weekNumber}`,
      {
        showToast,
      }
    );
  }

  getSpecificUsersWeeklyWorkShifts(year, weekNumber, userId, showToast = true) {
    return http.get(
      `http://localhost:5051/api/workshift/week/${year}/${weekNumber}/${userId}`,
      {
        showToast,
      }
    );
  }
}

const apiService = new ApiService();
export default apiService;
