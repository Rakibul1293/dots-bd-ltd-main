import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons';
import "./Avatar.css";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const Avatar = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl),
                setLoading(false)
            );
        }
    };

    const onDelete = (val) => {
        setImageUrl(val);
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <FileImageOutlined />}
            <div style={{ marginTop: 25, marginLeft: 79, color: "gray", width: 131 }} > Add Album Cover</div>
        </div>
    );

    props.handleImageUrl(imageUrl);

    // console.log(imageUrl);

    const DeleteButton = (
        <input type="" name="login-submit" id="login-submit" tabindex="4" className="form-control btn btn-login deleteBtn" style={{ marginTop: "5px" }} onClick={() => onDelete(false)} value="Delete" />
    )

    return (
        <section id="avatar">
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '218%', height: '257%', borderRadius: '4%' }} /> : uploadButton}
            </Upload>
            {DeleteButton}
        </section>
    );
}

export default Avatar;
