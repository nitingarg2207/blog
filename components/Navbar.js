import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NavBar({ user }) {
  // alert user logout
  const successfulLogout = () => {
    toast.info("User Logged Out", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const router = useRouter();
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const handleLogout = () => {
    if (confirm("Do you want to logged out ?")) {
      auth.signOut();
      successfulLogout();
      router.push("/");
    }
  };

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav
        className="navbar"
        onClick={(e) => e.stopPropagation()}
        style={{ color: "white" }}
      >
        <div className="nav-container">
          <Link href="/">
            <a className="nav-logo">
              NG BLOGS
              <i className="fa fa-code"></i>
            </a>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* checking if user is login or not */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link href="/createblog">
                    <a
                      onClick={click ? handleClick : null}
                      className={
                        router.pathname == "/createblog"
                          ? "active nav-links"
                          : "nav-links"
                      }
                    >
                      Create Blog
                    </a>
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() => handleLogout()}
                    variant="contained"
                    color="secondary"
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/signup">
                    <a
                      onClick={click ? handleClick : null}
                      className={
                        router.pathname == "/signup"
                          ? "active nav-links"
                          : "nav-links"
                      }
                    >
                      Signup
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login">
                    <a
                      onClick={click ? handleClick : null}
                      className={
                        router.pathname == "/login"
                          ? "active nav-links"
                          : "nav-links"
                      }
                    >
                      Login
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
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
}

export default NavBar;
