import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './SongList.css';

const SongList = (props) => {
    const [allData, setAllData] = useState([]);
    const [message, setMessage] = useState();

    const history = useHistory();
    console.log(props);

    const handleClickEdit = () => {
        history.push(`/edit-song/${props.data._id}`);
    }

    const handleClickDelete = () => {
        alert("Are you sure ? You want to Delete ?");
        axios.delete(`http://localhost:5000/api/userInfoDelete/${props.data._id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                alert('Opps !!! Not Deleted. Please try again');
            })

        axios.get('http://localhost:5000/api/')
            .then(res => {
                console.log(res);
                setAllData(res.data);
                props.getAllData(allData);
            })
            .catch(err => {
                console.log(err);
                setMessage(err);
            })

        history.push(`/`);
    }

    return (
        <section id="song-list">
            <div className="col-md-4">
                <div className="card">
                    <div className="first-section">
                        <img src={props.data.image} alt="" />
                    </div>
                    <div className="middle-section">
                        <div className="top-section">
                            <p>Song: <span>{props.data.songTitle}</span></p>
                            <p>Artist: <span>{props.data.artist}</span></p>
                        </div>
                        <div className="bottom-section">
                            <p>Publish By: <span>Montu</span></p>
                        </div>
                    </div>
                    <div className="end-section">
                        <Link onClick={() => handleClickEdit()}><EditOutlined /></Link>
                        <Link onClick={() => handleClickDelete()}><DeleteOutlined /></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SongList;
