import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import Avatar from '../layout/Avatar/Avatar';
import logo from "../../assets/images/logo.jpg";
import "./AddSong.css";

const AddSong = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imageUrl, setImageUrl] = useState();
    const [message, setMessage] = useState();
    const history = useHistory();

    const onSubmit = (data) => {
        console.log(data);
        data.imageUrl = imageUrl;
        data.token = localStorage.getItem("token");

        axios.post('http://localhost:5000/api/userInfo', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                console.log(data);
                history.push('/my-list');
            })
            .catch(err => {
                console.log(err);
                setMessage('Opps !!! Song not added. Please try again');
            })
    }

    const handleImageUrl = (imageUrl) => {
        setImageUrl(imageUrl);
    }

    return (
        <section id="add-song">
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
                                    <div className="col-xs-12 text-center">
                                        <a href="#" className="active" id="login-form-link">Add New Song</a>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form id="login-form" role="form" style={{ display: "block" }} onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <input type="text" name="title" id="title" ref={register({ required: true })} tabIndex="1" className="form-control" placeholder="Song Title" />
                                                {errors.title && <span className="errorss">Title is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="text" name="artist" id="artist" ref={register({ required: true })} tabIndex="2" className="form-control" placeholder="Artist" />
                                                {errors.artist && <span className="errorss">Title is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <div className="avatar-border">
                                                    <Avatar handleImageUrl={handleImageUrl} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Publish" onClick={() => handleImageUrl(false)} />
                                                    </div>
                                                </div>

                                                {
                                                    message && <span className="errorss" style={{ paddingLeft: "201px" }}>{message}</span>
                                                }

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

export default AddSong;
