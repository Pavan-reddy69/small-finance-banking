import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Users from './Users/Users'
import UserDetails from './Users/UserDetails'
import LoanAdmin from './Loans/LoanAdmin'
import LoanDetails from './Loans/LoanDetails/LoanDetails'

const Adminrouters = () =>{
    return((
        <Routes>
            <Route path='/admin-home' element={<Users/>}/>
            <Route path='/loans' element={<LoanAdmin/>}/>
            <Route path='/admin-home/:userId' element={<UserDetails/>}/>
            <Route path='/loans/:loanId' element={<LoanDetails/>}/>
        </Routes>
    ))
}

export default Adminrouters;