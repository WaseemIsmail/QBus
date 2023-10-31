// "use client";
// import CustomerHeader from '@/Components/CustomerHeader';


// export default function AboutUs() {

 
//   return (
  
//     <>
//     <div className="flex min-h-screen flex-col p-20">
//       <div>
//         <CustomerHeader/>
//       </div>
      
//     </div>
//     </>

//   )
// }
import React from 'react';
import CustomerHeader from '@/Components/CustomerHeader';

export default function AboutUs() {
  const aboutUsContent = [
    {
      title: 'Our Vision',
      content: "Our vision is simple yet powerful: to make public transportation as easy as possible. We want to empower you to move effortlessly within your city, ensuring that you always have a stress-free and reliable option for getting around.",
    },
    {
      title: 'Why Choose QBUS?',
      content: "QR Code Tickets: We've ditched the traditional paper tickets. With QBUS, your smartphone becomes your ticket. Simply scan the QR code and hop on board.\n\nTop-Up Flexibility: No more waiting in lines to buy tickets. Top up your QBUS account with a few taps, and you're ready to go.\n\nReal-Time Updates: Our app provides real-time information about bus routes, schedules, and even traffic conditions. You'll always be in the know.\n\nSafety First: Your safety is our top priority. We implement rigorous safety measures to ensure a secure and comfortable journey.\n\nEnvironmental Responsibility: We're committed to reducing our carbon footprint and contributing to a greener planet by encouraging the use of public transportation.",
    },
    {
      title: 'Our Team',
      content: "The brains behind QBUS consist of a diverse group of tech enthusiasts, transportation experts, and creative minds who are passionate about making urban travel more efficient and enjoyable. We're constantly striving to bring you the latest advancements in transportation technology.",
    },
    {
      title: 'Get Onboard Today!',
      content: "Whether you're a daily commuter or an occasional traveler, QBUS is your go-to solution for efficient and hassle-free public transportation. Join us in this journey towards a more connected and sustainable urban future. Download the QBUS app today and let us redefine the way you move around your city. Experience the future of transportation with QBUS!",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen flex-col p-20">
        <div>
          <CustomerHeader />
        </div>
        <div className="mt-8">
          {aboutUsContent.map((section, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
