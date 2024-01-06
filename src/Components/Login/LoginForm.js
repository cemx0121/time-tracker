import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

import { toast } from "react-toastify";
import ApiService from "../../Services/ApiService";
import styles from "./LoginForm.module.css";
import { Form } from "react-bootstrap";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const setField = (field, value) => {
    setUserCredentials({
      ...userCredentials,
      [field]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    ApiService.login(userCredentials)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        navigate("/");
        toast.success(`Welcome ${res.data.firstName} ${res.data.lastName}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleLogin}>
      <div className={styles.wrapper}>
        <div className={`container ${styles.main}`}>
          <div className={`row ${styles.row}`}>
            <div className={`col-md-6 ${styles["side-image"]}`}>
              <img
                className={styles.img}
                src={`${process.env.PUBLIC_URL}/greenAiLogo.png`}
                alt="greenAiLogo"
              />
              <div className={`text ${styles.text}`}>
                <p className={styles.paragraph}>
                  Keep track of your work shifts and colleagues work location{" "}
                  <i className={styles.creatorText}>- By Cem Turan</i>
                </p>
              </div>
            </div>
            <div className={`col-md-6 ${styles.right}`}>
              <div className={`input-box ${styles["input-box"]}`}>
                <header className={styles.headerText}>
                  Green.ai Employee Dashboard
                </header>
                <div className={`input-field ${styles["input-field"]}`}>
                  <input
                    type="text"
                    className={`input ${styles.input}`}
                    id="email"
                    onChange={(e) => setField("email", e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <label className={styles.label} htmlFor="email">
                    Email
                  </label>
                </div>
                <div className={`input-field ${styles["input-field"]}`}>
                  <input
                    type="password"
                    className={`input ${styles.input}`}
                    id="password"
                    onChange={(e) => setField("password", e.target.value)}
                    required
                  />
                  <label className={styles.label} htmlFor="password">
                    Password
                  </label>
                </div>
                <div className={`input-field ${styles["input-field"]}`}>
                  <button type="submit" className={styles.submit}>
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
