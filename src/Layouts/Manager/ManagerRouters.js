import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Users from './Users/Users'


const Adminrouters = () =>{
    return((
        <Routes>
            <Route path='/admin-home' element={<Users/>}/>
        </Routes>
    ))
}

export default Adminrouters;