import { useState } from "react";
import "./App.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, set } from "firebase/database";

function App() {
  let [fullname, setFullName] = useState("");
  let handleFullName = (e) => {
    setFullName(e.target.value);
  };

  let [email, setEmail] = useState("");
  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let [password, setPassword] = useState("");
  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [submittedData, setSubmittedData] = useState(null);

  const auth = getAuth();
  const db = getDatabase();

  let handleLogin = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: fullname,
        })
          .then(() => {
            toast("Registration Successful");
            setSubmittedData({
              username: fullname,
              email: email,
              password: password, // You might want to avoid showing the password in production
            });
          })
          .then(() => {
            set(ref(db, "users/" + user.user.uid), {
              username: fullname,
              email: email,
              password: password,
            });
          })
          .catch((error) => {
            // Handle errors
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  return (
    <div className="py-[12%] bg-[#4b4b4e]">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gray-700"></div>
              <p className="m-0 text-[16px] font-semibold dark:text-white">
                Login to your Account
              </p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy
                experience.
              </span>
            </div>
            <div className="w-full flex flex-col gap-2 text-[#fff]">
              <label className="font-semibold text-xs text-gray-400">
                Username
              </label>
              <input
                onChange={handleFullName}
                placeholder="Username"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              />
            </div>
            <div className="w-full flex flex-col gap-2 text-[#fff]">
              <label className="font-semibold text-xs text-gray-400">
                Email
              </label>
              <input
                onChange={handleEmail}
                placeholder="Enter your email"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              />
            </div>
            <div className="w-full flex flex-col gap-2 text-[#fff]">
              <label className="font-semibold text-xs text-gray-400">
                Password
              </label>
              <input
                onChange={handlePassword}
                placeholder="••••••••"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                type="password"
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
              >
                Login
              </button>
            </div>
            {submittedData && (
              <div className="mt-6 text-white">
                <h3 className="text-lg font-semibold">Submitted Data:</h3>
                <p>
                  <strong>Username:</strong> {submittedData.username}
                </p>
                <p>
                  <strong>Email:</strong> {submittedData.email}
                </p>
                <p>
                  <strong>Password:</strong> {submittedData.password}
                </p>{" "}
                {/* Be cautious about showing passwords */}
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
