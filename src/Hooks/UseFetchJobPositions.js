import { useState, useEffect } from "react";
import ApiService from "../Services/ApiService";

const useFetchJobPositions = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiService.getJobPositions()
      .then((res) => {
        setJobPositions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { jobPositions, loading, error };
};

export default useFetchJobPositions;
