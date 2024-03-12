// Authentication.js
import axios from "axios";
import { set_logstatus } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = (path) => {
  const backend_url = process.env.REACT_APP_BACKEND_URL

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backend_url}logged`, { withCredentials: true });
        console.log(res.data)
        dispatch(set_logstatus(res.data));
        if (res.data!==true) {
          navigate(path);
        }
      } catch (error) {
        console.log(error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [dispatch, navigate, path]);
};

export default Authentication;
