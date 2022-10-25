import React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';

const Registration = () => {
    const { data: session, status } = useSession();
  const [inpval, setInpval] = useState({
    designation: "",
    organisation: "",
    address: "",
    title: "",
    accomodation: "",
    gender: "",
    presentation: "",
    phonenumber: "",
    accompany: "",
    amount: "",
    draft: "",
    drawn: "",
    bank: "",
    place: "",
    date: "",
    transaction: "",
    transfer: "",
    Date: "",
    account: "",
  });
  const heading = {
    name: "Name",
    email: "Email",
    designation: "Designation",
    organisation: "Organisation",
    address: "Address",
    title: "Title",
    accomodation: "Accomodation Required",
    gender: "Gender",
    presentation: "Are you submitting any paper for presentation?",
    phonenumber: "Phone number",
    accompany: "Details of accompanying person ,if any:",
    amount: "Amount(INR/USD)",
    draft: "Demand draft No.",
    drawn: "Drawn on",
    bank: "in the bank",
    place: "Place",
    date: "Date",
    transaction: "Online transaction on",
    transfer: "Transfer ID/No.",
    Date: "Date",
    account: "Account No. from which transfer was made",
  };

  const options = {
    gender: ["male", "female"],
    accomodation: ["yes", "no"],
    presentation: ["yes", "no"],
  };

  const [edit, setEdit] = useState({
    name: false,
    email: false,
    designation: false,
    address: false,
    title: false,
    accomodation: false,
    gender: false,
    presentation: false,
    phonenumber: false,
    accompany: false,
    amount: false,
    draft: false,
    drawn: false,
    bank: false,
    place: false,
    date: false,
    transaction: false,
    transfer: false,
    Date: false,
    account: false
  });

  const func1 = (e) => {
    e.preventDefault();
  };

  const getData = (e) => {
    // console.log(e.target.value);

    let name, value;
    name = e.target.name;
    value = e.target.value;

    setInpval({ ...inpval, [name]: value });
    console.log(inpval);
  };

  const addData = (e) => {
    e.preventDefault();

    const sessionDetails = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
    }
    const res = {...inpval, ...sessionDetails}

    console.log("data added succesfully", res);
    localStorage.setItem("user", JSON.stringify([inpval]));
  };

  return (
    <>
      <Navbar/>
      <div className="registration_box bg-gray-100">
        <div class="container mx-auto">
          <div class="container mx-auto">
            <div class="flex justify-center md:px-6 my-2">
              <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                <div class="w-full bg-white  rounded-lg lg:rounded-l-none">
                  <form class="px-8 pt-8 pb-8  bg-white rounded grid grid-cols-1 lg:grid-cols-2">
                  <div class="lg:px-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Name
                        </label>
                        <div class="flex justify-left mb-6">
                            <div class="form-check form-check-inline mr-8">
                                {session?.user?.name}
                            </div>
                        </div>
                  </div>
                  <div class="lg:px-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Email
                        </label>
                        <div class="flex justify-left mb-6">
                            <div class="form-check form-check-inline mr-8">
                                {session?.user?.email}
                            </div>
                        </div>
                  </div>
                    {Object.keys(inpval).map((key) => {
                      return (
                        <div key={key}>
                          {(key === "gender" ||
                            key === "accomodation" ||
                            key === "presentation") && (
                            <div class="lg:px-2">
                              <label class="block mb-2 text-sm font-bold text-gray-700">
                                {heading[key]}
                              </label>
                              <div class="flex justify-left mb-6">
                                <div class="form-check form-check-inline mr-8">
                                  <input
                                    class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border                                    border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none                                    transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2                                    cursor-pointer"
                                    type="radio"
                                    name={`${key}`}
                                    value={options[key][0]}
                                    onChange={getData}
                                  />
                                  <label class="form-check-label inline-block text-gray-800 capitalize">
                                    {options[key][0]}
                                  </label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border                                    border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none                                    transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2                                    cursor-pointer"
                                    type="radio"
                                    name={`${key}`}
                                    value={options[key][1]}
                                    onChange={getData}
                                  />
                                  <label class="form-check-label inline-block text-gray-800 capitalize">
                                    {options[key][1]}
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}

                          {!(
                            key === "gender" ||
                            key === "accomodation" ||
                            key === "presentation"
                          ) && (
                            <div class="mb-4 lg:px-2">
                              <div className="flex justify-between p-2">
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                  {heading[key]}
                                </label>
                              </div>
                              {
                                ( key === 'email'?
                                <input
                                  class="w-full px-3 py-4 mb-3 text-sm leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                                  type="email"
                                  name={`${key}`}
                                  onChange={getData}
                                  style={{borderRadius: "1.2rem"}}
                                />
                                : (key === 'date' || key== 'Date')?
                                <input
                                  class="w-full px-3 py-4 mb-3 text-sm leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                                  type="date"
                                  name={`${key}`}
                                  onChange={getData}
                                  style={{borderRadius: "1.2rem"}}
                                />
                                :
                                <input
                                  class="w-full px-3 py-4 mb-3 text-sm leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                                  type="text"
                                  name={`${key}`}
                                  onChange={getData}
                                  style={{borderRadius: "1.2rem"}}
                                />
                                )
                              }
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </form>
                  <div class="mb-10 text-center px-4">
                    <button
                      class="w-full px-4 py-2 font-bold text-white bg-[#002834] rounded-full hover:bg-cyan-700 focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={addData}
                      style={{borderRadius: "999px"}}
                    >
                      Submit Your Abstract
                    </button>
                  </div>

                  {/* <div class=" flex justify-center">
                    <button
                      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                      onClick={() => {
                        setOne(false);
                        setTwo(true);
                      }}
                      style={{borderRadius: "1.8rem"}}
                    >
                      Next
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default Registration;