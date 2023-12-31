import React, { useState, useEffect } from 'react';
import DonutChart from './DonutChart';
import './Deposit.css';
import DepositHistoryTable from '../DepositTable/DepositTable';
import api from '../../Api/api';
import Loader, { TailSpin } from 'react-loader-spinner'; // Import the Loader component

function DepositHistory() {
  const [fdAmount, setFdAmount] = useState(0);
  const [rdAmount, setRdAmount] = useState(0);
  const [fdDeposits, setFdDeposits] = useState(0);
  const [deposits, setDeposits] = useState(0);
  const [loading, setLoading] = useState(true); // Add a loading state and set it to true initially
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${storedUserData.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };

    fetch(api + 'deposit/getDetails?accNo=' + storedUserData.accNo, {
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        setFdAmount(data.totalFdAmount);
        setFdDeposits(data.totalNoOfFD);
        setDeposits(data.totalNoOfRD);
        setRdAmount(data.totalRdAmount);
        setLoading(false); // Set loading to false after the API call is complete
      })
      .catch(error => {
        console.error('Error fetching FD amount:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const totalDeposits = fdAmount + rdAmount;
  const totalDeposit = deposits + fdDeposits;

  return (
    <div className='DepositContainer'>
      {loading ? ( // Render the Loader component when loading is true
       <div className='loader-container'>
       <TailSpin
         type="TailSpin"
         color="red"
         height={100}
         width={150}
       />
     </div>
      ) : (
        <div className="DepositHistory">
          <div className="ChartAndInfo">
            <DonutChart fdAmount={fdAmount} rdAmount={rdAmount} />
            <div className="DepositInfo">
              <div className="DepositRow">
                <div className="DepositLabel">Total FD Amount:</div>
                <div className="DepositValue">{fdAmount}</div>
              </div>
              <div className="DepositRow">
                <div className="DepositLabel">Total RD Amount:</div>
                <div className="DepositValue">{rdAmount}</div>
              </div>
              <div className="DepositRow">
                <div className="DepositLabel">Total Deposits:</div>
                <div className="DepositValue">{totalDeposits}</div>
              </div>
              <div className="DepositRow">
                <div className="DepositLabel">Overall Total Deposit:</div>
                <div className="DepositValue">{totalDeposit}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='DepositTable'>
        <DepositHistoryTable />
      </div>
    </div>
  );
}

export default DepositHistory;
