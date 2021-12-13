import React, { useState } from "react";
import {NavbarContainer,
    NavbarExtendedContainer,
    NavbarInnerContainer,
    NavbarLink,
    OpenLinksButton,
    NavbarLinkExtended,
  } from "../styles/Navbar.style";

function Home() {

    const [extendNavbar, setExtendNavbar] = useState(false)
    return (
        <NavbarContainer extendNavbar={extendNavbar}>
          <NavbarInnerContainer>
                <NavbarLink to="/login"> Login</NavbarLink>
                <NavbarLink to="/signup"> Signup</NavbarLink>
                <NavbarLink to="/allusers"> All Users</NavbarLink>
                 <OpenLinksButton
                  onClick={() => {
                    setExtendNavbar((current) => !current);
                  }}>
                  {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
                </OpenLinksButton>
             </NavbarInnerContainer>
          {extendNavbar && (
            <NavbarExtendedContainer>
              <NavbarLinkExtended to="/login"> Login</NavbarLinkExtended>
              <NavbarLinkExtended to="/signup"> Signup</NavbarLinkExtended>
              <NavbarLinkExtended to="/allusers"> All Users</NavbarLinkExtended>
            </NavbarExtendedContainer>
          )}
        </NavbarContainer>
      );
    }


export default Home;   
           
                   