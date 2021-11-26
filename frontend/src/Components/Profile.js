import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';
import AdminProfile from '../Admin/Components/AdminProfile'
import FarmerProfile from '../Farmers/Components/FarmerProfile';
import ExpertProfile from '../Experts/Components/ExpertProfile'
const Profile = () => {
const [user,setUser] = useContext(UserContext);
    
if(user.type==='A')
{
    return (
        <AdminProfile token={user.token} />
    )
}
else if(user.type==='F')
{
 return (
     <FarmerProfile token={user.token} />
 )
}
else if(user.type==='F')
{
    return (
        <ExpertProfile token={user.token} />
    )
}
}

export default Profile
