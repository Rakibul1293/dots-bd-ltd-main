import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import $ from "jquery";
import logo from "../../assets/images/logo.jpg";
import "./auth.css";

$(function () {
    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#btn-reg-after-txt').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#btn-login-after-txt').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});

const Auth = () => {
    const [isConPass, setIsConPass] = useState();
    const [matchConPass, setMatchConPass] = useState();
    const [message, setMessage] = useState();
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const signUpSubmits = (data) => {
        console.log(data);

        axios.post('http://localhost:5000/auth/signup', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                console.log(data);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                setMessage('Registration Failed !!! Please try again');
            })
    }

    const signInSubmits = (e) => {
        e.preventDefault();
        const email = document.getElementById("emailAddress").value;
        console.log("email: ", email);
        let password = document.getElementById("pass").value;
        console.log("pass: ", password);

        const data = {
            email,
            password
        }
        console.log(data);

        axios.post('http://localhost:5000/auth/signin', data, {
            headers: {
                'Content-Type': 'application/json'
                //'Authorization' : `Bearer ${}`
            }
        })
            .then((data) => {
                console.log(Object.keys(data));
                console.log(data);
                console.log(data.data);
                localStorage.setItem("token", data.data.token);
                if (data.data.message === "Auth failed") return setMessage("User doesn't exist");
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                setMessage("User doesn't exist");
            })
    }
    console.log(message);

    const conPassHandle = () => {
        const password = document.getElementById("password").value;
        console.log(password);
        let conPassword = document.getElementById("conPassword").value;
        console.log(conPassword);
        if (!conPassword) {
            conPassword = "undefined";
        }

        if (conPassword == "undefined") {
            setIsConPass(true);
        } else if (password !== conPassword) {
            setMatchConPass(true);
        } else if (password === conPassword) {
            setMatchConPass(false);
        }
    }

    return (
        <section id="auth">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <img className="auth-img" src={logo} alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-6 active">
                                        <a href="#" className="active" id="login-form-link">Sign In</a>
                                    </div>
                                    <div className="col-xs-6">
                                        <a href="#" id="register-form-link">Sign Up</a>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form id="login-form" role="form" style={{ display: "block" }} onSubmit={signInSubmits}>
                                            <div className="form-group">
                                                <input type="email" name="emailAddress" id="emailAddress" ref={register({ required: true })} tabIndex="1" className="form-control" placeholder="Email Address" />
                                                {errors.emailAddress && <span className="errorss">Email is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="pass" id="pass" ref={register({ required: true })} tabIndex="2" className="form-control" placeholder="Password" />
                                                {errors.pass && <span id="passErr" className="errorss">Password is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
                                                    </div>
                                                </div>

                                                {
                                                    setMessage && <span className="errorss" style={{ paddingLeft: "201px" }}>{message}</span>
                                                }

                                                <p id="btn-login-after-txt" style={{ paddingLeft: "165px", paddingTop: "21px", color: "#3b68b8", cursor: "pointer", fontWeight: "bold" }}>Create a new Account ?</p>
                                            </div>
                                        </form>

                                        <form id="register-form" role="form" style={{ display: "none" }} onSubmit={handleSubmit(signUpSubmits)}>
                                            <div className="form-group">
                                                <input type="email" name="email" id="email" ref={register({ required: true })} tabIndex="1" className="form-control" placeholder="Email Address" />
                                                {errors.email && <span className="errorss">Email is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="password" id="password" ref={register({ required: true })} tabIndex="2" className="form-control" placeholder="Password" />
                                                {errors.password && <span className="errorss">Email is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="conPassword" id="conPassword" ref={register({ required: true })} tabIndex="2" className="form-control" placeholder="Confirm Password" />
                                                {
                                                    isConPass && errors.conPassword && <span className="errorss">Confirm Password is required</span>
                                                }
                                                {
                                                    matchConPass && <span id="conPassErr" className="errorss">Password Doesn't Match</span>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register" onClick={() => conPassHandle()} />
                                                    </div>
                                                </div>

                                                {
                                                    message && <span className="errorss" style={{ paddingLeft: "201px" }}>{message}</span>
                                                }

                                                <p id="btn-reg-after-txt" style={{ paddingLeft: "171px", paddingTop: "21px", color: "#3b68b8", cursor: "pointer", fontWeight: "bold" }}>Already have an Account ?</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Auth;
