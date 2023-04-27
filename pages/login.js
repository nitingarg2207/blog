import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // alert user login
  const successfulLogin = () => {
    toast.success('Login Succesful', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  const loginError = (message) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      successfulLogin();
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      loginError(err.message);
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx">
              <img
                src="https://images.unsplash.com/photo-1572499465883-9d7dd5a321fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80"
                alt="..."
              />
            </div>
            <div className="formBx">
              <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                <h2>Sign In</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" name="" value="Login" />
                <p className="signup">
                  Don't have an account ?
                  <Link href="/signup">
                    <a>Sign Up.</a>
                  </Link>
                </p>
              </form>
              <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default login;
