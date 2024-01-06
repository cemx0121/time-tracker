import { useState, useEffect } from "react";
import ApiService from "../Services/ApiService";
import { useSelector } from "react-redux";

const useFetchUsers = () => {
  const { userData } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ApiService.getAllProfiles().then((res) => {
      const currentUserFirst = res.data.sort((a, b) => {
        // Place current user at the beginning
        if (a.userId === userData.userId) return -1;
        if (b.userId === userData.userId) return 1;

        // Sort the rest alphabetically by firstName
        return a.firstName.localeCompare(b.firstName);
      });
      setUsers(currentUserFirst);
    });
  }, [userData.userId]);

  return users;
};

export default useFetchUsers;
