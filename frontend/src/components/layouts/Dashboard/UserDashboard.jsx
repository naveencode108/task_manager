import React, { useEffect } from 'react'
import { getAlltask } from '../../../services/actions/taskApi'
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  
  let {token}=useSelector(state=>state.auth);
  useEffect(()=>{
     getAlltask(token);
  },[])

  return (
    <div>
      mainDashboard
    </div>
  )
}

export default UserDashboard
