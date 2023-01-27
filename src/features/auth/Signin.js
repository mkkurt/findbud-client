import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useSigninMutation } from "./authApiSlice";

const Signin = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [emailRef, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Signing In: ", email, pwd);
      const userData = await signin({ email, password: pwd }).unwrap();
      console.log("Signin Success: ", userData);
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (err.data?.message) {
        setErrMsg(err.data.message);
      } else if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Email or Password Incorrect");
      } else {
        setErrMsg("Signin Failed");
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </section>
  );

  return content;
};
export default Signin;
