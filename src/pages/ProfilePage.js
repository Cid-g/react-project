import RootContainer from "../components/layout/RootContainer.js"
import ProfileForm from "../components/forms/ProfileForm.js"
import UserHeader from "../components/ui/UserHeader.js"

function ProfilePage(){
return (
    <RootContainer>
        
      <UserHeader />
      <ProfileForm/>
      
    </RootContainer>
)
}
export default ProfilePage