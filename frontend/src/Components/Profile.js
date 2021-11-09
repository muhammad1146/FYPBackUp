import React, { useContext } from 'react'
import { UserContext } from './Contexts/UserContext';
import AdminProfile from '../Admin/Components/AdminProfile'
import FarmerProfile from '../Farmers/Components/FarmerProfile';
import ExpertProfile from '../Experts/Components/ExpertProfile'
const Profile = () => {
const [user,setUser] = useContext(UserContext);
    
if(user.type==='A')
{
    return (
        <AdminProfile />
    )
}
else if(user.type==='F')
{
 return (
     <FarmerProfile />
 )
}
else if(user.type==='F')
{
    return (
        <ExpertProfile />
    )
}
}

export default Profile
