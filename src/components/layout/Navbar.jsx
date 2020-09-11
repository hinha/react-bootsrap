import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import Logo from "../../assets/LogoSwaping.png";
import "../../assets/css/main.css";


const logotest = {
  backgroundImage: 'url(' + Logo + ')',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  color: "rgba(0,0,0,0)",
  height: "47px",
  padding:"0",
  width: "57px",
  borderBottom: "0",
  margin: "auto",
}

class Navbar extends Component {
  state = {
    isOpen: false,
    collapseID: ""
  }

  constructor(props) {
    super(props)
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));
  
  render() {
    console.log(logotest)
    return (
      
        <MDBNavbar dark expand="md" fixed="top">
          <div className="container">
            <MDBNavbarBrand className="">
              <div className="lb-bg-logo.swaping" style={logotest}></div>
              {/* <img src={Logo} width="100%" height="38" ></img> */}
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapseS")} />
            <MDBCollapse id="navbarCollapseS" isOpen={this.state.collapseID} className="fz14" navbar>
              <MDBNavbarNav left>
                  <MDBNavItem className="pl-2 pr-2">
                    <MDBNavLink to="/">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem className="pl-2 pr-2">
                    <MDBNavLink to="#!">Features</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem className="pl-2">
                    <MDBNavLink to="#!">Pricing</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem className="pl-2 pr-2">
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon icon="envelope" className="mr-1" />Contact</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className="pl-2 pr-2">
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon icon="cog" className="mr-1" />Settings</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className="pl-2 pr-2">
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>Profile</MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem href="#!">My account</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Log out</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem className="pl-3">
                    <div className="lb-btn lb-none-margin-tp">
                      <Link to="/sign/iam" className="lb-btn-p-primary">
                        <span>Masuk</span>
                      </Link>
                      {/* <MDBNavLink className="lb-btn-p-primary" to="#!">
                        <span>Masuk</span>
                      </MDBNavLink> */}
                    </div>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </div>
      </MDBNavbar>
    )
  }
}

// const Navbar = (props) => {
//   console.log(props)
//   return (
    
    
//   )
// }


export default Navbar;
