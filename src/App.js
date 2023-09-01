import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Routers from './Layouts/Customer/CustomerLayout/CustomRoutes';
import Home from '../src/pages/Landing/Home';
import Adminrouters from './Layouts/Manager/ManagerRouters';
import SignUpPage from './pages/sign up/Signup';
import Land from './Layouts/Customer/Home/Home';
import Transactions from './Layouts/Customer/Transaction/Transaction';
import Withdraw from './Layouts/Customer/Transaction/Withdraw';
import Transfer from './Layouts/Customer/Transaction/Transfer';

import Loan from './Layouts/Customer/Loans/Loan';
import Deposit from './Layouts/Customer/Deposit/Deposit';

function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (inputObj) => {
    console.log('Logging in with:', inputObj);
    setUserRole(inputObj.roleName);
    sessionStorage.setItem('userDetails', JSON.stringify(inputObj));
    window.location.href = '/home';
  };

  useEffect(() => {
    const userDetailsString = sessionStorage.getItem('userDetails');

    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      console.log('Retrieved user details:', userDetails);
      setUserRole(userDetails.roleName);
    }
  }, []);


  return( ( 
   <Router>
  
  <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<Home />} />
    <Route path="/customer-home" element={<Land />} />
    <Route path="/loan" element={<Loan />} />
    <Route path="/deposit" element={<Deposit/>} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/signup" element={<SignUpPage />} />
</Routes>
</Router>))
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        {userRole === 'CUSTOMER' && <Route path="/*" element={<Routers />} />}
        {userRole === 'MANAGER' && <Route path="/*" element={<Adminrouters />} />}
        {!userRole && <Route path="/*" element={<Login onLogin={handleLogin} />} />}
      </Routes>
    </Router>
  );
}

export default App;
