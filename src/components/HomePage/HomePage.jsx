import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";



export default function HomePage(loggedUser, handleLogout){
    return(
        <>
            <PageHeader loggedUser={loggedUser} handleLogout={handleLogout}/>
            <Link to='/signup'><div>Sign Up</div></Link>
            <Link to='login'><div>Log In</div></Link>
        </>
    )
}
