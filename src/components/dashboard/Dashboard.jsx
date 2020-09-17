import React, {Fragment} from 'react';
import { MDBJumbotron, MDBContainer, MDBRow } from "mdbreact";
import Navbar from '../layout/Navbar.jsx';
import { TitleComponent } from "../Title.jsx";

const Dashboard = () => {
    return (
        <Fragment>
            <TitleComponent title="Swaping Dashboard" />
            <Navbar brands="swap" />
            <MDBContainer>
                <h1>HELLO</h1>
            </MDBContainer>
        </Fragment>
    )
}

export default Dashboard;