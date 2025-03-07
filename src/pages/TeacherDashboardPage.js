import React from "react";
import RootContainer from "../components/layout/RootContainer";
import UserHeader from "../components/ui/UserHeader";
import StudentTable from "../components/ui/Students.Table";


function TeacherDashboardPage() {


  return (
    <RootContainer>
      <UserHeader />
      
    <StudentTable />
    </RootContainer>
  );
}

export default TeacherDashboardPage;