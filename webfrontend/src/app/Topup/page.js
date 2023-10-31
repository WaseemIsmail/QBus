"use client"
import { useAuthContext } from "../../../hooks/useAuthContext";
import CustomerHeader from "@/Components/CustomerHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from '../../Components/ConfirmationDialog';

export default function Topup() {
  // const route = useRoute();
  // const id = route.params?.id;
  const {user} = useAuthContext()

  const [balance, setBalance] = useState(0);
  const [topup, setTopup] = useState(0);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationAmount, setConfirmationAmount] = useState(0);


  useEffect(() => {
    const getBalance = async (id) => {
      try {
        console.log(id)
        const response = await axios.get(
          `http://localhost:4000/api/user/balance/${id}`
        );
        if (response.status === 200) {
          setBalance(response.data.balance);
        } else {
          console.error(response.data.error);
        }
      } catch (err) {
        console.error("Api Failed:", err);
        if (err.response && err.response.status === 400) {
          console.error(err.response.data.error);
        }
      }
    };
    getBalance(user?.id);
  }, [user]);

  const topupAccount = async (balance) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/user/topup/${user?.id}`,
        {
          balance,
        }
      );
      if (response.status === 200) {
        setBalance(response.data.balance);
      } else {
        console.error(response.data.error);
      }
    } catch (err) {
      console.error("Api Failed:", err);
      if (err.response && err.response.status === 404) {
        console.error(err.response.data.error);
      }
    }
  };

  const handleConfirm = () => {
    topupAccount(confirmationAmount);
    setConfirmationOpen(false);
  };

  const handleCancel = () => {
    console.log('No');
    setConfirmationOpen(false);
  };

  return (
    <>
    <div className="flex">
      <div>
        <CustomerHeader/>
      </div>
    </div>
    <section className="" >
  <div className="flex flex-col items-center justify-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> 
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Top-up Your Account 
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Balance</label>
                      <div className=" text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                      {`Rs. ${balance}.00`}
                      </div>
                      
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quick Top-up</label>
                      <div className="flex space-x-4">
                  <div className="flex-1">
                  <button
                    type="button" // Use type="button" to prevent form submission
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm-text-sm rounded-lg focus-ring-primary-600 focus-border-primary-600 block w-full p-2.5 cursor-pointer" // Added cursor-pointer for mouse pointer
                    onClick={() => {
                    setConfirmationAmount(100);
                    setConfirmationOpen(true);
                    }}
                    style={{
                    background: "lightblue", // Button background color
                    padding: "8px 16px", // Button padding
                    display: "inline-block", // Display as inline-block
                    width: "auto", // Set the width to "auto" to adjust based on content
                    textAlign: "center", // Center-align text
                    }}>
                    Rs.100.00
                  </button>

                  </div>
                  <div className="flex-1">
                  <button
                    type="button" // Use type="button" to prevent form submission
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm-text-sm rounded-lg focus-ring-primary-600 focus-border-primary-600 block w-full p-2.5 cursor-pointer" // Added cursor-pointer for mouse pointer
                    onClick={() => {
                      setConfirmationAmount(500);
                      setConfirmationOpen(true);
                      }}
                    style={{
                    background: "lightblue", // Button background color
                    padding: "8px 16px", // Button padding
                    display: "inline-block", // Display as inline-block
                    width: "auto", // Set the width to "auto" to adjust based on content
                    textAlign: "center", // Center-align text
                    }}>
                    Rs.500.00
                  </button>
                  </div>
                  <div className="flex-1">
                  <button
                    onClick={() => {
                      setConfirmationAmount(1000);
                      setConfirmationOpen(true);
                      }}
                    type="button" // Use type="button" to prevent form submission
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm-text-sm rounded-lg focus-ring-primary-600 focus-border-primary-600 block w-full p-2.5 cursor-pointer" // Added cursor-pointer for mouse pointer
                    style={{
                    background: "lightblue", // Button background color
                    padding: "8px 16px", // Button padding
                    display: "inline-block", // Display as inline-block
                    width: "auto", // Set the width to "auto" to adjust based on content
                    textAlign: "center", // Center-align text
                    }}>
                    Rs.1000.00
                  </button>
                  </div>
                </div>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Top-up</label>
                      <input onChange={(e) => setTopup(e.target.value)}  type="text" name="password" id="password" placeholder="Enter your amount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <button  onClick={() => {
                          setConfirmationAmount(topup);
                          setConfirmationOpen(true);
                          }} type="button" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed</button>
                 <ConfirmationDialog
                 message={`Are you sure you want to topup Rs.${confirmationAmount}.00?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isConfirmationOpen}
      />
              </form>
          </div>
      </div>
  </div>
</section>
    </>
    
  )
}



