import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Routers from './Layouts/Customer/CustomerLayout/CustomRoutes';
import Home from '../src/pages/Landing/Home';
import Adminrouters from './Layouts/Manager/ManagerRouters';
import SignUpPage from './pages/sign up/Signup';


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
