
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Segment,
  } from "semantic-ui-react";
import PageHeader from "../Header/Header";
import '../HomePage/HomePage.css'



export default function HomePage(loggedUser, handleLogout){
    return(
        <>

        <section id = 'home'>
            <div class='words' id='welcome'>Welcome to Nova</div>
            <Link to='/signup'><div class='words' id="signup">Sign Up</div></Link>
            <Link to='login'><div class='words' id = 'login'>Log In</div></Link>
        </section>
        <div id='nasa'> <Image id ="nasaLogo" src="https://i.imgur.com/Rxz2UQI.png" /></div>
        </>
    )
}
