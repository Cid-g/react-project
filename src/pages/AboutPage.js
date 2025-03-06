import HomePageNavigationBar from "../components/ui/HompageNavigationBar.js" 
import RootContainer from "../components/layout/RootContainer.js"
import { Typography } from "@mui/material"
import PageContainer from "../components/layout/PageContainer.js"
function AboutPage(){
return (
    <RootContainer>
    <HomePageNavigationBar/>
    <PageContainer>
    <Typography variant="h1" textAlign= "center" >
    About Us
    </Typography>
    </PageContainer>

    </RootContainer>
)
}

export default AboutPage