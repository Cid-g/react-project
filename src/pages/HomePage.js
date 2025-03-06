import RootContainer from "../components/layout/RootContainer.js"
import HomePageNavigationBar from "../components/ui/HompageNavigationBar.js"
import PageContainer from "../components/layout/PageContainer.js"
import { Typography } from "@mui/material"

function HomePage(){
return (
    <RootContainer>
        <HomePageNavigationBar />
        <PageContainer>
            <Typography variant="h1" textAlign="center">
                Home
            </Typography>
        </PageContainer>
    </RootContainer>    
)
}
export default HomePage