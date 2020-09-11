import React, {Fragment} from 'react';
import { MDBContainer } from "mdbreact";
import { TitleComponent } from "./Title.jsx";

const SignInIam = () => {
  return (
    <Fragment>
      <TitleComponent title="Swaping Sign-In" />
      <MDBContainer>
        <div>h2</div>  
      </MDBContainer>
    </Fragment>
  );
};

const SignInRoot = () => {
  return (
    <Fragment>
      <TitleComponent title="👾 About!" />
      <MDBContainer>
        <div>h2</div>  
      </MDBContainer>
    </Fragment>
  );
};

export {SignInIam, SignInRoot};
