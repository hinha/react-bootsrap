const cryptoJS = require("crypto-js");
import React, { Component, Fragment, useEffect } from 'react';
// import { Field, reduxForm } from 'redux-form';
import {Form} from "react-bootstrap"
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBBtn, MDBAlert } from 'mdbreact';
import { connect } from 'react-redux';
import { TitleComponent } from '../Title.jsx';
import { actionLoginRoot } from "../../_services/user.action";
import { basic as apiAuth } from '../../api';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class SignInPage extends Component {


    constructor(props) {
        super(props);
        
        console.log("the props login: ", props)
        this.state = {
            account: "",
            username: "",
            email: "",
            emailCode: "",
            password: "",
            errors: {
                account: "",
                username: "",
                email: "",
                emailCode: "",
                password: ""
            },
            token: false,
            role: props.role,
            radio: 1,
            formInput: {
                id: "",
                
            },
            isValidated: false,
            hasError: false,
            jwtAuthError: false,
            loadingSign: false, // this loading page
            emailInfo: false, // this only admin send email
        };
        
        
        this.changeHandler = this.changeHandler.bind(this);
        this.submitSignHandler = this.submitSignHandler.bind(this);
        this.onClickRadioRole = this.onClickRadioRole.bind(this);
        this.changeSignHandler = this.changeSignHandler.bind(this);

        // this.abortController = new AbortController();
    }

    // static getDerivedStateFromProps(props, state) {
        
    // }

    UNSAFE_componentWillMount() {
        var n = new Date();
        let invdate = new Date(n.toLocaleString('en-US', {
            timeZone: "Asia/Jakarta"
        }));
        let fdate = `signin:${invdate.getFullYear()}-${invdate.getMonth()+1}-${invdate.getDate()}:${process.env.CREDENTIAL_AUTH_KEY}`
        let md5hash = cryptoJS.MD5(fdate);

        apiAuth.get("token/jwt?action=signin", {
            headers: {
                'Content-Type': 'application/json',
                "X-Swaping-G": md5hash.toString()
            },
            credentials: "same-origin"
        }).then(resp => {
            if (resp.data.error === undefined) {
                this.setState({jwtAuthError: false})
            }
            if (resp.data.error === "") {
                this.setState({jwtAuthError: true})
            }
        }).catch(err => {
            this.setState({jwtAuthError: true})
            return err.response
        })
    }

    // componentDidMount() {
        
    // }
    // componentWillUnmount() {
    //     this.abortController.abort();
    // }

    changeSignHandler = () => {
        const {errors, radio} = this.state
        const {password, email, account} = this.state

        if (radio === 1) {
            if (email.length < 1) { errors.email = "* email must be required"; return null}
            else if (password.length < 8) {errors.password = "* password must be required"; return null}
            else {
                this.setState({loadingSign: true})
                console.log("nunggu");
                setTimeout(() => {
                    this.setState({loadingSign: false, isValidated: true, emailInfo: true})
                }, 2000)
                console.log("oke jadi");
            }
            
        } else {
            if (account.length < 1 || account.length < 6 ) {
                errors.account = "* account must be required"
                this.setState({isValidated: false})
                return null
            }
            this.setState({loadingSign: true})
            console.log("nunggu");
            setTimeout(() => {
                this.setState({loadingSign: false, isValidated: true})
            }, 2000)
            console.log("oke jadi");
        }
    }
    submitSignHandler = (event) => {
        const {errors, radio} = this.state
        const {password, email, account} = this.state
        event.preventDefault();
        event.target.className += " was-validated";
    };

    submitPermissionHandler = event => {
        event.preventDefault();
        const {username, password, email, emailCode, account} = this.state
        const { dispatch } = this.props;

        if (username !== "" && account !== "" && password !== "") {
            console.log("USER LOGIN");
        }

        if (email !== "" && password !== "" && emailCode !== "") {
            console.log("ROOT Login " + this.props)
            dispatch(actionLoginRoot(email, password, emailCode));
        }
    }
    

    changePermission = (set) => () => {
        this.setState({isValidated: set})
    }

    onClickRadioRole = (nr) => () => {
        this.setState({
            radio: nr
        })
    }

    changeHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        
        switch (name) {
            case "account":
                if (isNaN(value)) {
                    errors.account = "* Please enter a valid Account ID."
                } else errors.account = value.length < 6 ? "* Account ID must be 6 characters long" : "";
                break;
            case "username":
                errors.username = value.length < 1 ? '* Username must required' : '';
                break;
            case "email":
                errors.email = !validEmailRegex.test(value) || value.length < 4 ? "* Please enter a valid address." : "";
            case "password":
                errors.password = value.length < 8 ? '* Password must be 8 characters long!' : '';
                break;
            case "emailCode":
                errors.emailCode = value.length < 6 ? "* Code must be 6 characters long!" : "";
            default:
                break;
        }

        this.setState({[event.target.name]: event.target.value, errors});
    };

    layoutSign = () => (
        <>
        <Fragment>
            {['radio'].map((type) => (
                <div key={`signin-general-${type}`} className="mb-3">
                <Form.Check 
                    onChange={() => this.setState({formInput: {id: "email"}})}
                    onClick={this.onClickRadioRole(1)}
                    checked={this.state.radio === 1 ? true : false} 
                    type={type}
                    id={`signin-general-root`}
                    label="Root user"
                />

                <Form.Check
                    onChange={() => this.setState({formLabel: {id: "account"}})}
                    onClick={this.onClickRadioRole(2)}
                    checked={this.state.radio===2 ? true : false} 
                    type={type}
                    label="IAM user"
                    id={`signin-general-iam`}
                />
                </div>
            ))}
            
            {(() => {
                if (this.state.radio === 1) {
                    return (
                        <Fragment>
                            <div className="form-group">
                                <label
                                    htmlFor="email"
                                    className="text-input">
                                    Root user email address
                                </label>
                                <input
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.changeHandler}
                                    type="email"
                                    id="email"
                                    className="form-control form-control-user"
                                    noValidate
                                    required
                                />
                                {this.state.errors.email.length >  0 && <div className="invalid-feedback">{this.state.errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="password"
                                    className="text-input">
                                    Password
                                </label>
                                <input
                                    value={this.state.password}
                                    name="password"
                                    onChange={this.changeHandler}
                                    type="password"
                                    id="password"
                                    className="form-control form-control-user"
                                    required
                                />
                                {this.state.errors.password.length >  0 && <div className="invalid-feedback">{this.state.errors.password}</div>}
                            </div>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <div className="form-group">
                                <label
                                    htmlFor="account"
                                    className="text-input">
                                    Account ID (12 digits)
                                </label>
                                <input
                                    value={this.state.account}
                                    name="account"
                                    onChange={this.changeHandler}
                                    type="text"
                                    id="account"
                                    className="form-control form-control-user"
                                    noValidate
                                    required
                                />
                                {this.state.errors.account.length >  0 && <div className="invalid-feedback">{this.state.errors.account}</div>}
                            </div>
                            
                        </Fragment>
                    )
                }

            })()}
        </Fragment>
        </>
    )
    
    render() {
        const { loggingIn, alert } = this.props;
        const {errors, emailInfo, isValidated, radio, loadingSign} = this.state;
        let formTitle = ""
        // if (this.state.token) {
        //     console.log("token: " + this.state.token)
        // }
        // if (role) {
        //     formTitle = "A"
        // } else {
        //     formTitle = "B"
        // }
        console.log("loggingIn: " + loggingIn)
        if (this.state.jwtAuthError) {
            return <h1>Something went wrong.</h1>
        } else {
            return (
                <Fragment>
                
                <TitleComponent title="Swaping Sign-In" />
                    <MDBContainer>                
                        {/* {this.state.loadingSign && <Loading Indicator />} */}
                        <MDBRow className="justify-content-center">
                            <MDBCol md="9" lg="11" xl="7" className="offset-xl-0">
                                <MDBCard className="shadow-lg o-hidden border-0 my-5 ml-lg-5 mr-lg-5 mt-lg-5">
                                    <MDBCardBody className="p-0">
                                        <MDBRow>
                                            <MDBCol lg="6" xl="12" className="p-5">
                                                <div className="text-center mt-4 mb-4">
                                                    <h4 className="text-dark text-lg-center" style={{fontWeight: "bold"}}>Sign in as {radio === 1 ? "Root" : "User"}</h4>
                                                </div>
                                                {alert.message && <MDBAlert color={`alert ${alert.type}`}>{alert.message}</MDBAlert>}
                                                {emailInfo && <MDBAlert color="success">We already sent the code to your email</MDBAlert>}
                                                
                                                <form
                                                    className="needs-validation user"
                                                    onSubmit={isValidated === true ? this.submitPermissionHandler : this.submitSignHandler}
                                                    noValidate
                                                    >
                                                    
                                                    
                                                    {(() => {
                                                        if (!isValidated) {
                                                            return <this.layoutSign errors={errors}/>
                                                        } else {
                                                            if (radio === 1) {
                                                                return (
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="emailCode"
                                                                            className="text-input">
                                                                            Code
                                                                        </label>
                                                                        <input
                                                                            value={this.state.emailCode}
                                                                            name="emailCode"
                                                                            onChange={this.changeHandler}
                                                                            type="text"
                                                                            id="emailCode"
                                                                            className="form-control form-control-user"
                                                                            autoComplete="off"
                                                                            required
                                                                        />
                                                                        {errors.emailCode.length >  0 && <div className="invalid-feedback">{errors.emailCode}</div>}
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Fragment>
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="username"
                                                                            className="text-input">
                                                                            User name
                                                                        </label>
                                                                        <input
                                                                            value={this.state.username}
                                                                            name="username"
                                                                            onChange={this.changeHandler}
                                                                            type="text"
                                                                            id="username"
                                                                            className="form-control form-control-user"
                                                                            required
                                                                        />
                                                                        {errors.username.length >  0 && <div className="invalid-feedback">{errors.username}</div>}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="password"
                                                                            className="text-input">
                                                                            Password
                                                                        </label>
                                                                        <input
                                                                            value={this.state.password}
                                                                            name="password"
                                                                            onChange={this.changeHandler}
                                                                            type="password"
                                                                            id="password"
                                                                            className="form-control form-control-user"
                                                                            required
                                                                        />
                                                                        {errors.password.length >  0 && <div className="invalid-feedback">{errors.password}</div>}
                                                                    </div>
                                                                    </Fragment>
                                                                )
                                                            }
                                                            
                                                        }
                                                    })()}
                                                    
                                                    <MDBBtn 
                                                        color="primary" 
                                                        type="submit" 
                                                        className="btn-block br-small" onClick={this.changeSignHandler} disabled={this.loadingSign}>
                                                        {loadingSign && <span className="mr-1"><i className="fa fa-sync-alt fa-spin"></i></span>}
                                                        {isValidated === false ? "Next" : "Sign in"}

                                                    </MDBBtn>
                                                    
                                                    
                                                    {/* <MDBRow>
                                                        <MDBCol md="4" className="mb-3">
                                                            
                                                        </MDBCol>
                                                    </MDBRow> */}
                                                </form>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Fragment>
            )
        }
    }
}

// function jwtAuth() {
//     var n = new Date();
//     let invdate = new Date(n.toLocaleString('en-US', {
//         timeZone: "Asia/Jakarta"
//     }));
//     let fdate = `signin:${invdate.getFullYear()}-${invdate.getMonth()+1}-${invdate.getDate()}`
//     let md5hash = cryptoJS.MD5(fdate);

//     try {
//         const response = apiAuth.get("token/jwt?action=signin", {
//             headers: {
//                 'Content-Type': 'application/json',
//                 "X-Swaping-G": md5hash.toString()
//             },
//             credentials: "same-origin"
//         })
//         return response
//     } catch(error) {
//         return false
//     }
// }

function mapStateToProps(state) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    console.log("mapStateToProps: ", state)
    return {
        loggingIn,
        alert
    };
}

const connectedSignPage = connect(mapStateToProps)(SignInPage)
export {connectedSignPage as SignInPage};