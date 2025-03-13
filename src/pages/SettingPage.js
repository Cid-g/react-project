import React, { useState } from 'react';
import UserHeader from '../components/ui/UserHeader';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';

import SlideMenu from '../components/ui/Menu';




export default function SettingPage() {
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
            
        
        </PageContainer>
       
      </MainLayout>
    </>
  );
}