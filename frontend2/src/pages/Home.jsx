import React from "react";
import {Link} from 'react-router-dom';
function Home(){
    return(
    <>
    <h1>Home</h1>
    <Link to="/about">about us</Link>
    <br></br>
    <Link to="/register/student">register as student</Link>
    <br></br>
    <Link to="/register/teacher">register as teacher</Link>
    <br></br>
    <Link to="/login/teacher">login teacher</Link>
    <br></br>
    <Link to="/login/student">login student</Link>
    <br></br>
    <Link to="/teacher">teacher home</Link>
    <br></br>
    <Link to="/student">student home</Link>

    </>
    )
}

export default Home;