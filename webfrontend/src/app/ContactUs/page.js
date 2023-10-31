"use client";
import CustomerHeader from '@/Components/CustomerHeader';
import mainimage from '@/assets/nft-removebg-preview.png';
import Image from 'next/image';
import { useEffect,useState } from "react";
import { initFlowbite } from "flowbite";
import axios, { AxiosResponse } from "axios";

const initialFormState = {
  _id: "",
  email:"",
  subject:"",
  message:"",
 
}

export default function ContactUs() {

  const [formValues, setFormValues] = useState(initialFormState);
  const [data, setData] = useState();
  useEffect(() => {
      async function getTasks() {
        try {
          const response  = await axios.get("http://localhost:4000/api/contactUs",{
              headers: {
                Accept: "application/json",
              },
            }
          );
  
          setData(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return [];
          } else {
            console.log("unexpected error: ", error);
            return [];
          }
        }
      }
      getTasks();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
          try {
      // Your Axios API call goes here
      const response = await axios.post('http://localhost:4000/api/contactUs', formValues);
     
     
      // Clear the form after successful submission
      setFormValues(initialFormState);
          } catch (error) {
           console.log(error.message || 'An error occurred');
       }
       };

  useEffect(() => {
      initFlowbite();
    }, []);

  return (
  
    <>
    <div className="flex min-h-screen flex-col p-20">
      <div>
        <CustomerHeader/>
      </div>
      <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form onSubmit={handleSubmit} className="space-y-8">
          <div> 
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" name="email" id="email" value={formValues.email} onChange={handleChange}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter your email" required/>
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" name="subject" value={formValues.subject} onChange={handleChange}  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea name="message" value={formValues.message} onChange={handleChange}  id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
</section>
    </div>
    </>

  )
}
