import React from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.jpg';
import './Nav.css';

const Nav = () => {
    const history = useHistory();

    const handleSignout = () => {
        localStorage.removeItem("token");
    }

    const handleMyListRoute = () => {
        console.log(localStorage.getItem("token"));
        if (!localStorage.getItem("token") || localStorage.getItem("token") === "undefined" || localStorage.getItem("token") === "null") {
            history.push('/auth');
        } else {
            const currentLocation = window.location.pathname;
            console.log(currentLocation);
            const path_id = currentLocation.split('/').slice(1).join('/');
            console.log("Path Id: ", path_id);

            history.push('/my-list');
        }
    }

    const handleAddSongRoute = () => {
        console.log(localStorage.getItem("token"));
        if (!localStorage.getItem("token") || localStorage.getItem("token") === "undefined" || localStorage.getItem("token") === "null") {
            history.push('/auth');
        } else {
            const currentLocation = window.location.pathname;
            console.log(currentLocation);
            const path_id = currentLocation.split('/').slice(1).join('/');
            console.log("Path Id: ", path_id);

            history.push('/add-song');
        }
    }

    return (
        <section id="nav">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/">Home <span className="sr-only">(current)</span></Link></li>
                            <li><Link onClick={handleMyListRoute}>My List</Link></li>
                            <li><Link onClick={handleAddSongRoute}>Add Song</Link></li>
                            {
                                localStorage.getItem("token") ? <li><Link to="/" onClick={handleSignout}>Log Out</Link></li> : <li><Link to="/auth">Log In</Link></li>
                            }
                            {/* {<li><Link to="/auth" onClick={handleSignout}>Log In</Link></li>
                            <li><Link to="/auth" onClick={handleSignout}>Log Out</Link></li>} */}
                        </ul>
                        <form className="navbar-form navbar-right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="logo-position">
                            <a className="navbar-brand" href="#">
                                <img src={logo} alt="" />
                                <div className="line-bar-right"></div>
                                <p className="nav-text">Home</p>
                                <div className="line-bar-left"></div>
                                <div className="clearfix"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Nav;
