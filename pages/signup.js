import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // alert user created
  const successfulSignup = (username) => {
    toast.info(`Welcome ${username}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await auth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({
        displayName: name,
      });
      successfulSignup(result.user.displayName);
      setName("");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="user signinBx">
            <div className="formBx">
              <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                <h2>Create an account</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="UserName"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" name="" value="Sign Up" />
                <p className="signup">
                  Already have an account ?
                  <Link href="/login">
                    <a>Sign in.</a>
                  </Link>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img
                src="https://images.unsplash.com/photo-1575713445721-edbd42ed2a4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=332&q=80"
                alt="..."
              />
            </div>
          </div>
        </div>
      </section>
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
  );
};

export default signup;
