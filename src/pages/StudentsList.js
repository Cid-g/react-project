import React, { useState } from 'react';
import UserHeader from '../components/ui/UserHeader';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';
import StudentTable from '../components/ui/Students.Table'
import SlideMenu from '../components/ui/Menu';
import Slidebar from '../components/ui/Sidebar'



export default function StudentsList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <UserHeader 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
      />
      <SlideMenu isMenuOpen={isMenuOpen} />
      <MainLayout isMenuOpen={isMenuOpen}>
        <PageContainer>
         <StudentTable />
        
        </PageContainer>
        <Slidebar />
      </MainLayout>
    </>
  );
}