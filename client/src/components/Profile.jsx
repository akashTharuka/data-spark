import React, {useState, useEffect} from 'react';
import Register from './Register';
import PasswordModal from './PasswordModal'
import axios from 'axios';
import config from '../config.json';
import DatasetEditModel from './DatasetEditModel';
import ConfirmModel from './ConfirmModel';

import { images } from '../javascript/imageImports.js';

const Profile = (props) => {

    const [email, setEmail]       = useState("");
    const [username, setUsername] = useState("");
    const [userID, setUserID]     = useState(null);
    const [numOfUploads ,setNumOfUploads] = useState(0);

    const [background, setBackground] = useState(null);

    const [datasets, setDatasets] = useState([]);

    const imageArray = [images.background2, images.background3, images.background4, images.background5];

    useEffect(() => {
        let randomIndex = Math.floor(Math.random()*4);
        setBackground(imageArray[randomIndex]);
    }, []);

    useEffect(() => {

        const access_token = sessionStorage.getItem("token");

        if(access_token) {
            axios.get(config.domain + '/profile', { headers: {

                'Authorization': `Bearer ${access_token}`,
                'Content-type': 'application/json'
            }})
            .then((res) => {
                setEmail(res.data.email);
                setUsername(res.data.username);
                setUserID(res.data.userID);
                setNumOfUploads(res.data.num_of_uploads);
            })
            .catch((error) => {
                console.log(error);
                sessionStorage.removeItem("token");
                document.location.reload();
            });
        }
    }, []);

    useEffect(() => {
        if (props.datasets){
            setDatasets(props.datasets);
        }
    }, [props.datasets]);

    const getPersonalDataSets = () => {
        let content = [];
        for (let i = 0; i < datasets.length; i++){
            if (userID === datasets[i].uploader_id){
                content.push(
                    <div className="d-flex flex-column align-items center mx-auto my-3" key={i}>
                        <div className="card personal bg-light" style={{width: "100%", cursor: "pointer"}}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{datasets[i].title}</h5>
                                <small className='last-modified'>{datasets[i].upload_time}</small>
                            </div>
                            <div className="edit-btns d-flex float-end">
                                <i className="btn bi bi-pen" data-bs-toggle="modal" data-bs-target="#dataset-edit-modal" data-bs-dismiss="modal"></i>
                                <i className="btn bi bi-trash3" data-bs-toggle="modal" data-bs-target="#confirm-modal" data-bs-dismiss="modal"></i>
                            </div>
                            <DatasetEditModel id={datasets[i].id} title={datasets[i].title} description={datasets[i].description} />
                            <ConfirmModel id={datasets[i].id} />
                        </div>
                    </div>
                );
            }
        }
        return content;
    };

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id='profileOffCanvas' aria-labelledby='profileOffCanvasLabel' aria-hidden="true">
            <div className="offcanvas-body">
                <div className="row mx-auto d-flex justify-content-center mb-2">
                    <button type='button' className="btn btn-sm text-muted" data-bs-dismiss="offcanvas" aria-label='Close' tabIndex="-1">CLOSE</button>
                </div>

                <div className="row mb-3 mx-auto">
                    <div className="profile-card card" style={{minHeight: "30rem", backgroundImage: `url(${background})`, border: "none"}}>
                        <div className="card-body">
                            <h6 className="card-title display-6 title text-center">PROFILE</h6>
                            <h5 className="username text-center text-dark fs-4 mt-5">{username}</h5>
                            <h6 className="email text-center">{email}</h6>

                            <div className="col-10 mx-auto mt-5 justify-content-center d-flex">
                                <button type="button" className="btn btn-sm btn-outline-dark py-2 mx-auto mt-3 px-4" tabIndex="-1" data-bs-toggle="modal" data-bs-target="#edit-modal" data-bs-dismiss="modal" style={{minWidth: "11rem"}}>update profile</button>
                            </div>
                            <div className="col-10 mx-auto justify-content-center d-flex">
                                <button type="button" className="btn btn-sm btn-outline-dark py-2 mx-auto mt-3 px-4" tabIndex="-1" data-bs-toggle="modal" data-bs-target="#edit-password-modal" data-bs-dismiss="modal" style={{minWidth: "11rem"}}>update password</button>
                            </div>

                            <div className="row mx-auto mt-5">
                                <div className="col-4 mx-auto d-flex flex-column">
                                    <span className="uploads-num fs-1 text-dark text-center fw-bolder ">{numOfUploads}</span>
                                    <span className="uploads-label small text-dark text-center">uploads</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Register type="edit" email={email} username={username} />
                    <PasswordModal />
                </div>

                <div className="row my-3 d-flex">
                    {/* <div className="row text-center bg-warning pt-3 pb-2 mx-auto">
                        <h2 className="lead">Your Datasets</h2>
                    </div> */}
                    {(props.datasets) ? getPersonalDataSets() : ""}
                </div>
            </div>
        </div>
    );
}

export default Profile;
