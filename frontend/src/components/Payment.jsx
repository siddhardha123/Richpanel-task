import React, { useState } from 'react';
const PaymentPage = () => {


  const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [user] = useState({
    name: 'John Doe',
    plan: 'Premium Plan',
    price: '$19.99',
  });

  const handlePayment = (e) => {
    e.preventDefault();
    // Implement your payment logic here
    // For simplicity, let's assume payment is successful after a brief delay
    
  };

  return (
    <div className="bg-[#004e96] min-h-screen flex items-center justify-center">
    <div className="bg-white  rounded shadow-md flex">
      {/* Left side */}
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-semibold mb-2">Complete Payment</h2>
        <p className="text-sm mb-4">Enter your credit or debit card details below</p>
        <div className="flex mb-4">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
            placeholder="1234 5678 9012 3456"
          />
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
            type="text"
            value={cardInfo.expiryDate}
            onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
            placeholder="MM/YY"
          />

          <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
          type="password"
          value={cardInfo.cvv}
          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
          placeholder="CVV"
        />
        </div>
        
        <button
          type="submit"
          className="bg-[#004e96] text-white rounded  py-2 px-3 mt-3"
          onClick={handlePayment}
        >
          Confirm Payment
        </button>

      </div>

      {/* Right side */}
      <div className="w-1/2 p-12 bg-gray-200 rounded">
  <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
  <table className="w-full">
    <tbody>
      <tr className="border-b border-gray-400 ">
        <td className="font-semibold w-1/2 p-2">Full Name:</td>
        <td className="w-1/2 text-right p-2">{user.name}</td>
      </tr>
      <tr className="border-b border-gray-400 ">
        <td className="font-semibold w-1/2 p-2">Billing Cycle:</td>
        <td className="w-1/2 text-right p-2">{user.plan}</td>
      </tr>
      <tr className="border-b border-gray-400">
        <td className="font-semibold w-1/2 p-2">Price:</td>
        <td className="w-1/2 text-right p-2  ">{user.price}</td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
  </div>
  );
};

export default PaymentPage;
