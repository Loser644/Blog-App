import ExplorePage from "../Page/Explore/UserExplore";
import PromulGatePage from "../Page/proMulgate/promulGate";
import HomeEl from "../Page/UserComponent/HomePage/homeEl";

function UserHomeEl() {
    return(
        <HomeEl/>
    )
}
function PromulGateEl(params) {
    return(
        <PromulGatePage/>
        )
}
function ExploreEl() {
    return(
        <ExplorePage/>
    )
}
export{UserHomeEl,PromulGateEl,ExploreEl}