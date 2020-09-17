// import { Field, reduxForm } from 'redux-form';
// import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBBtn } from 'mdbreact';
// import React, {Component} from 'react';


// const FormRoot = (handleSubmit, changeHandler, state, errors) => (
//     <MDBContainer>
//             <MDBRow className="justify-content-center">
//                 <MDBCol md="9" lg="11" xl="7" className="offset-xl-0">
//                     <MDBCard className="shadow-lg o-hidden border-0 my-5 ml-lg-5 mr-lg-5 mt-lg-5">
//                         <MDBCardBody className="p-0">
//                             <MDBRow>
//                                 <MDBCol lg="6" xl="12" className="p-5">
//                                     <div className="text-center mt-4 mb-4">
//                                         <h4 className="text-dark text-lg-center" style={{fontWeight: "bold"}}>Sign in as IAM user</h4>
//                                     </div>
                                    
//                                     <form
//                                         className="needs-validation user"
//                                         onSubmit={handleSubmit}
//                                         noValidate
//                                         >
//                                         <div className="form-group">
//                                             <label
//                                                 htmlFor="email"
//                                                 className="text-input">
//                                                 Email address
//                                             </label>
//                                             <input
//                                                 value={state.email}
//                                                 name="email"
//                                                 onChange={changeHandler}
//                                                 type="email"
//                                                 id="email"
//                                                 className="form-control form-control-user"
//                                                 required
//                                             />
//                                             {errors.email.length >  0 && <div className="invalid-feedback">{errors.email}</div>}
//                                         </div>
//                                         <div className="form-group">
//                                             <label
//                                                 htmlFor="password"
//                                                 className="text-input">
//                                                 Password
//                                             </label>
//                                             <input
//                                                 value={state.password}
//                                                 name="password"
//                                                 onChange={changeHandler}
//                                                 type="password"
//                                                 id="password"
//                                                 className="form-control form-control-user"
//                                                 required
//                                             />
//                                             {errors.password.length >  0 && <div className="invalid-feedback">{errors.password}</div>}
//                                         </div>
//                                         <MDBBtn color="primary" type="submit" className="btn-block br-small">
//                                             Sign in
//                                         </MDBBtn>
//                                         {/* <MDBRow>
//                                             <MDBCol md="4" className="mb-3">
                                                
//                                             </MDBCol>
//                                         </MDBRow> */}
//                                     </form>
//                                 </MDBCol>
//                             </MDBRow>
//                         </MDBCardBody>
//                     </MDBCard>
//                 </MDBCol>
//             </MDBRow>
//         </MDBContainer>
// )

// export default FormRoot;