import React, { useState ,useContext,useEffect} from 'react';
import axios from 'axios'
import baseUrl from '../BaseUrl.json'
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const PricingTable = () => {

  const { data, setData } = useContext(AppContext);
  useEffect(() => {
    // Fetch data from the API and set the plans state
    fetchPlans();
  }, []);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [plan,setPlan] = useState('');
  const [plans,setPlans] = useState([])
  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${baseUrl.url}/getPlans`);
      console.log(response.data.plans);
      setPlans(response.data.plans);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const navigate = useNavigate();
  const handlePlan=(p,month,year)=>{
      setPlan(p)
      if(selectedPlan === 'monthly'){
        setData({ ...data, price : month });
      }else{
        setData({ ...data, price : year });
      }
      console.log(plan)
  }

  const handleContinue = () => {
    setData({ ...data, cycle: selectedPlan });
    navigate('/payment')
  }


  const handleToggle = () => {
    setSelectedPlan(prevPlan => (prevPlan === 'monthly' ? 'yearly' : 'monthly'));
  };

 

  return (
    <>
   {plans &&  <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-center my-4 text-2xl text-bold">
        Choose the right plan for you
      </div>

      <div className=" justify-center">
        <table className="w-full text-center ">
          <thead>
            <tr>
              <th className="bg-gray-100">
            
                <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={handleToggle}
        checked={selectedPlan === 'monthly'}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
      </div> 
      <div className="ml-3"> {selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'}</div>
    </label>

              </th>
              {plans.map(plan => (
                <th key={plan.type} className={`p-4 text-gray-700`}>
                <div
                  className={`bg-[#004e96] text-white text-center container flex justify-center items-center h-20 w-20 
                    hover:bg-green-400
                   cursor-pointer`}
                  onClick={() => handlePlan(plan.name,plan.monthly_price,plan.yearly_price)}
                >
                  <h1>{plan.name}</h1>
                </div>
              </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-400">
              <td className="font-bold">Price</td>
              {plans.map(plan => (
                <td
                  key={plan.type}
                  className={`p-4 cursor-pointer`}
                 
                >
                  {selectedPlan === 'monthly' ? plan.monthly_price : plan.yearly_price} INR
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-400">
              <td className="font-bold">Video Quality</td>
              {plans.map(plan => (
                <td
                  key={plan.type}
                  className={`p-4 cursor-pointer ${
                    plan.type === plan ? 'text-blue-500' : ''
                  }`}
                  
                >
                  {plan.video_quality}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-400">
              <td className="font-bold">Resolution</td>
              {plans.map(plan => (
                <td
                  key={plan.type}
                  className={`p-4 cursor-pointer`}
                 
                >
                  {plan.resolution}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-400">
  <td className="font-bold">Devices</td>
  {plans.map((plan) => (
    <td key={plan.type} className={`p-4 cursor-pointer`} >
      {plan.devices_allowed.split('+').map((device, index) => (
        <div key={index}>{device}</div>
      ))}
    </td>
  ))}
</tr>
            <tr className="border-b border-gray-400">
              <td className="font-bold">Active Screens</td>
              {plans.map(plan => (
                <td
                  key={plan.type}
                  className={`p-4 cursor-pointer`}
                  
                >
                  {plan.screens_allowed}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
       
        <button
            type="submit"
            className="bg-[#004e96] text-white rounded  py-2 px-3 w-1/2 ml-[25%] mt-10"
            onClick={()=>handleContinue()}
          >
            continue
          </button>
      </div> 
      
    </div> }
    </>
  );
};

export default PricingTable;


