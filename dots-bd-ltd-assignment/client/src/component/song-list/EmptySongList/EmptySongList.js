import React from 'react';
import { useHistory } from 'react-router';
import { AudioOutlined } from '@ant-design/icons';
import './EmptySongList.css';

const EmptySongList = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/add-song');
    }

    return (
        <section id="empty-song-list">
            <div className="clearfixes"></div>
            <div className="empty-song">
                <p>You Haven't added any song yet !</p>
                <p>Let's get started</p>
            </div>
            <div className="icon" onClick={handleClick}>
                <AudioOutlined />
                <p className="icon-text">Add New Song</p>
            </div>

        </section>
    );
}

export default EmptySongList;
