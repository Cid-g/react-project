import MainLayout from "../components/layout/MainLayout.js";
import ProfileForm from "../components/forms/ProfileForm.js"
import UserHeader from "../components/ui/UserHeader.js"
import PageContainer from "../components/layout/PageContainer.js";
import SlideMenu from "../components/ui/Menu.js";
import Sliderbar from "../components/ui/Sidebar.js"
import { useState } from "react";


function ProfilePage(){
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
      <ProfileForm />
    </PageContainer>
    <Sliderbar />
  </MainLayout>
</>
)
}
export default ProfilePage