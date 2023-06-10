import React, { useContext, useState } from "react";
import loading2 from "../../assets/785 (1).gif";
import man from "../../assets/man.jpeg";
import { CustomersDb } from "../../providers/CustomerProvider";
import { db } from "../../firebase/firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import Loading from "../Loading";

const EditModal = ({
  setModal,
  phonenumber,
  firstname,
  lastname,
  email,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({
    firstname: firstname,
    phonenumber: phonenumber,
    lastname: lastname,
    email: email,
    address: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const docRef = doc(db, "customers",id );
    setLoading(true);

    updateDoc(docRef, {
      ...edit,
    })
      .then(() => {
        setLoading(false);
        toast.success("Success: Updated !");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setModal(false);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
        setLoading(false);
      });
  };
  console.log(edit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  return (
    <div className="w-full h-full fixed top-0 bg-opacity-25 flex justify-center items-center bg-[#f4f4f493]">
      {<Loading loading={loading} />
      }
      <div className="flex p-5 bg-white shadow-lg rounded-md flex-col modal">
        <h2 className="text-center text-2xl font-bold">EDIT INFORMATION</h2>

        <form className="my-7 w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col px-7 w-full">
            <h2 className="text-xl font-semibold">General Information</h2>
            <div className="flex gap-4">
              <span>
                <div>
                  <h2>First Name</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    defaultValue={firstname}
                    onChange={handleChange}
                    name="firstname"
                  />
                </div>
              </span>
              <span>
                <div>
                  <h2>Last Name</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    defaultValue={lastname}
                    onChange={handleChange}
                    name="lastname"
                  />
                </div>
              </span>
            </div>
            <h2 className="text-xl font-semibold mt-4">Contact Information</h2>
            <div className="flex gap-4">
              <span>
                <div>
                  <h2>Phone Number</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    defaultValue={phonenumber}
                    onChange={handleChange}
                    name="phonenumber"
                  />
                </div>
              </span>
              <span>
                <div>
                  <h2>Email</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    defaultValue={email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
              </span>
            </div>

            <h2 className="text-xl font-semibold mt-4">Contact Information</h2>

            <div className="flex gap-4 items-end justify-between w-full">
              <span className="w-full">
                <div>
                  <h2>Address</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    onChange={handleChange}
                    name="address"
                  />
                </div>
              </span>

              <span className="flex gap-3">
                <button
                  className="px-4 py-3 bg-red-600 text-white rounded-md"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-3  bg-blue-600 text-white rounded-md">
                  Update
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Customer = () => {
  const [showModal, setShowModal] = useState(false);



  const currentUrl = window.location.href.split("/")[4]
  console.log(currentUrl,"curl");

  const { customer, database } = useContext(CustomersDb);

  console.log("Jesus Christ !", customer);

  const currentCustomer =
    database && database.find((customerr) => customerr.id === currentUrl);

  const generalInfo =
    currentCustomer && currentCustomer._document.data.value.mapValue.fields;
  const {
    firstname,
    lastname,
    phonenumber,
    lastvisit,
    email,
    total_purchase_amount,
    tag,
  } = generalInfo || {};

  // Rest of the code...

  console.log(database);

  return (
    <>
      {generalInfo ? (
        <div className="w-full">
          <span className=" flex items-center justify-center w-full p-5 gap-10">
            <h2 className="text-3xl text-center">User Profile</h2>
            <span className="block w-4/5 h-[1px] bg-black"></span>
          </span>

          <div className="flex w-full justify-center items-center">
            <div className="card flex shadow-lg w-4/5 rounded-lg mx-10 bg-white flex-col md:flex-row">
              <div className="flex flex-col justify-center items-center px-20 gap-5 border-r-2 border-[#00000021]">
                <span>
                  <img src={man} alt="" />
                </span>

                <span className="flex flex-col items-center justify-center font-bold text-xl">
                  <p>{lastname.stringValue}</p>
                  <p>{firstname.stringValue}</p>
                  <p className="text-emerald-400 text-sm">
                    ({tag.stringValue} Customer)
                  </p>
                </span>

                <p
                  className="text-red-500 cursor-pointer font-bold p-3"
                  onClick={() => setShowModal(true)}
                >
                  Edit
                </p>
              </div>

              <form className="flex flex-col justify-center items-start ">
                <div className="flex flex-col px-7  py-7">
                  <h1 className="font-bold">General Information</h1>
                  <div className="flex gap-4">
                    <span className="flex gap-3 flex-col md:flex-row">
                      <p className="text-gray-500">CustomerID:</p>
                      <p className="font-bold text-blue-600">{customer}</p>
                    </span>
                    <span className="flex gap-3 flex-col md:flex-row">
                      <p className="text-gray-500">First Name:</p>
                      <p className="font-bold text-blue-600">
                        {firstname.stringValue}
                      </p>
                    </span>
                    <span className="flex gap-3 flex-col lg:flex-row">
                      <p className="text-gray-500">Last Name:</p>
                      <p className="font-bold text-blue-500">
                        {lastname.stringValue}
                      </p>
                    </span>
                  </div>
                </div>

                <span className="block w-full h-[.5px] bg-[#b5b1b1]"></span>
                <div className="flex flex-col px-7 py-7">
                  <h1 className="font-bold">Contact Information</h1>
                  <div className="flex gap-4">
                    <span className="flex gap-3 flex-col lg:flex-row">
                      <p className="text-gray-500">Email:</p>
                      <p className="font-bold text-blue-600">
                        {email.stringValue}
                      </p>
                    </span>
                    <span className="flex gap-3">
                      <p className="text-gray-500">Phone Number:</p>
                      <p className="font-bold text-blue-600">
                        +{phonenumber.stringValue}
                      </p>
                    </span>
                  </div>
                </div>

                <span className="block w-full h-[.5px] bg-[#b5b1b1]"></span>
                <div className="flex flex-col px-7 py-7">
                  <h1 className="font-bold">Address Information</h1>
                  <div className="flex gap-4">
                    <span className="flex gap-3 flex-col lg:flex-row">
                      <p className="text-gray-500">Address:</p>
                      <input
                        type="text"
                        defaultValue={
                          "University of Lagos, Birikisu Iyede Street, Lagos State, Nigeria"
                        }
                        className="lg:min-w-[500px] text-blue-500"
                        name="address"
                      />
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {showModal && (
            <EditModal
              setModal={setShowModal}
              firstname={firstname.stringValue}
              lastname={lastname.stringValue}
              email={email.stringValue}
              phonenumber={phonenumber.stringValue}
              id={currentUrl}
            />
          )}
        </div>
      ) : (
       <Loading />
      )}
    </>
  );
};

export default Customer;
