import UserTable from "../components/ui/UserTable";
import React from "react";
import RootContainer from "../components/layout/RootContainer";
import UserHeader from "../components/ui/UserHeader";

function AdminDashboardPage(){

    return(

    <RootContainer>
    <UserHeader />
    <UserTable />
    </RootContainer>
        
    )

}
export default AdminDashboardPage