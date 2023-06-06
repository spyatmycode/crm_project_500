import React, { useState, useContext } from "react";
import svg from "../assets/auth.png";
import loader from "../assets/220 (2).gif";
import {
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaPhoneAlt,
  FaUserEdit,
  FaUser,
} from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { auth } from "../firebase/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { staffContext } from "../providers/StaffProvider";
import { db } from "../firebase/firebaseconfig";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const Signin = ({ setCurrent }) => {
  const { staff, setStaff, staffDetails } = useContext(staffContext);
  const navigate = useNavigate();

  // console.log("this is the user before sign in",user);

  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, formInput.email, formInput.password)
      .then((userCredential) => {
        console.log(userCredential.user);

        setStaff(userCredential.user);

        toast.success(`Login successful ! Welcome ${staffDetails.firstname}`);
        console.log(userCredential.user);
        navigate("/customers");
      })
      .catch((err) => {
        console.log(err);

        toast.error(`Oops! ${err.code}`);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-[#FFFFFF] flex  h-screen justify-center items-center ">
        <div className="hidden lg:flex w-2/3 justify-center items-center ">
          <span className="w-full flex items-center justify-center ">
            <Fade>
              <img src={svg} alt="svg" width={"600px"} />
            </Fade>
          </span>
        </div>
        <div className="flex flex-col h-full justify-center items-center lg:bg-[#3E51AC] gap-10 lg:gap-28 lg:w-2/3">
          <Fade >
            <h2 className="text-4xl text-center md:text-4xl font-normal text-gray-700 lg:text-white ">
              Welcome to <span className="text-blue-600">DCRM</span>
            </h2>
            <form
              className="flex flex-col gap-20"
              onSubmit={(e) => handleSubmit(e)}
            >
              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  Email
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaUserCircle size={20} color="black" />
                  <input
                    type="email"
                    className="w-full p-3 outline-none"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </span>
              </span>
              <span className=" ">
                <label className="text-lg font-semibold text-gray-500 lg:text-white">
                  Password
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaLock size={20} color="black" />
                  <input
                    type="password"
                    className="w-full p-3 outline-none"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                </span>
              </span>

              <button
                type="submit"
                className="bg-[#DC9F40] lg:rounded-full rounded-full p-4 text-white
                        hover:bg-gray-300 duration-700
                        hover:transition-all ease-out hover:duration-700 hover:text-blue-950
                        flex justify-center
                        "
                onClick={() => setLoading(true)}
              >
                {/* Register */}{" "}
                {loading ? <img src={loader} width={"60px"} /> : "Sign In"}
              </button>
              <span className="lg:text-white">
                Don't have an account?{" "}
                <span
                  onClick={() => setCurrent(1)}
                  className="text-blue-600 lg:text-red-500 cursor-pointer 
                        "
                >
                  Register here.
                </span>
              </span>
            </form>
          </Fade>
        </div>
      </div>
    </>
  );
};
const Register = ({ setCurrent }) => {
  const [formInput, setFormInput] = useState({ password: "", email: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  console.log(formInput);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, formInput.email, formInput.password)
      .then((userCredential) => {
        // Signed in ()

        const staff = userCredential.user;

        const staffRef = doc(db, "staff", staff.uid);

        setDoc(staffRef, {
          ...formInput,
        });

        setLoading(false);

        navigate("/customers");

        toast.success("Registration success");

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        const errorMessage = error.message;
        setLoading(false);
        toast.error(`${errorMessage}`);

        // ..
      });
  };
  return (
    <>
      <div className="bg-[#FFFFFF] flex h-screen justify-center items-center">
        <div className="hidden lg:flex w-2/3 justify-center items-center ">
          <span className="w-full flex items-center justify-center ">
            <Fade>
              <img src={svg} alt="svg" width={"600px"} />
            </Fade>
          </span>
        </div>
        <div className="flex flex-col h-full justify-center items-center lg:bg-[#3E51AC] gap-10 lg:gap-28 lg:w-2/3">
          <Fade direction="top">
            <h2 className="text-4xl text-center md:text-4xl font-normal text-gray-700 lg:text-white ">
              Welcome to <span className="text-blue-600">DCRM</span>
            </h2>
            <form
              className="flex flex-col  w-full"
              onSubmit={(e) => handleSubmit(e)}
            >
              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  First Name
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaUserEdit size={20} color="gray" required />
                  <input
                    type="text"
                    className="w-full p-3 outline-none"
                    name="firstname"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </span>
              </span>
              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  Last Name
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaUserEdit size={20} color="gray" required />
                  <input
                    type="text"
                    className="w-full p-3 outline-none"
                    name="lastname"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </span>
              </span>
              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  StaffID
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaUser size={20} color="gray" required />
                  <input
                    type="text"
                    className="w-full p-3 outline-none"
                    name="staffID"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </span>
              </span>

              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  Email
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaEnvelope size={20} color="gray" required />
                  <input
                    type="email"
                    className="w-full p-3 outline-none"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </span>
              </span>

              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  Phone Number
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaPhoneAlt size={20} color="gray" required />
                  <input
                    type="tel"
                    className="w-full p-3 outline-none"
                    defaultValue={"234"}
                    name="phone"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </span>
              </span>

              <span className=" ">
                <label className="text-lg font-semibold lg:text-white text-gray-500">
                  Password
                </label>

                <span className="flex items-center bg-white  !border-2 border-blue-600 rounded-full lg:border-white px-5">
                  <FaLock size={20} color="gray" />
                  <input
                    type="password"
                    className="w-full p-3 outline-none"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </span>
              </span>

              <button
                type="submit"
                className="bg-[#DC9F40] lg:rounded-full rounded-full p-4 text-white
                hover:bg-gray-300 duration-700
                hover:transition-all ease-out hover:duration-700 hover:text-blue-950
                flex justify-center my-6
                        "
                onClick={(e) => handleSubmit(e)}
              >
                {/* Register */}{" "}
                {loading ? <img src={loader} width={"60px"} /> : "Register"}
              </button>
              <span className="lg:text-white">
                Do you already have an account ?{" "}
                <span
                  onClick={() => setCurrent(0)}
                  className="text-blue-600 lg:text-red-500 cursor-pointer
                        "
                >
                  Sign in
                </span>
              </span>
            </form>
          </Fade>
        </div>
      </div>
    </>
  );
};

const Render = () => {
  const [current, setCurrent] = useState(0);
  return current === 0 ? (
    <Signin setCurrent={setCurrent} />
  ) : (
    <Register setCurrent={setCurrent} />
  );
};

export default Render;
