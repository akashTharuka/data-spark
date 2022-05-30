import React, {useState, useEffect} from 'react';
import Register from './Register';
import PasswordModal from './PasswordModal'
import axios from 'axios';
import config from '../config.json';
import DatasetEditModel from './DatasetEditModel';
import ConfirmModel from './ConfirmModel';

const Profile = (props) => {

    const [email, setEmail]       = useState("");
    const [username, setUsername] = useState("");
    const [userID, setUserID]     = useState(null);

    const [datasets, setDatasets] = useState([]);

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

    const handleEdit = (datasetID) => {
        console.log("edit dataset details = " + datasetID);
    }

    const handleDelete = (datasetID) => {
        console.log("delete dataset = " + datasetID);
    }

    const getPersonalDataSets = () => {
        let content = [];
        for (let i = 0; i < datasets.length; i++){
            if (userID === datasets[i].uploader_id){
                content.push(
                    <div className="d-flex flex-column align-items center mx-auto my-3" key={i}>
                        <div className="card personal" style={{width: "100%", cursor: "pointer"}}>
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
            <div className="offcanvas-header text-center">
                <h5 id="profileOffCanvasLabel" className='title display-6'>PROFILE</h5>
                <button type='button' className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label='Close' tabIndex="-1"></button>
            </div>
            <div className="offcanvas-body">
                <div className="row my-3 d-flex">
                    <div className="row text-center bg-warning pt-3 pb-2 mx-auto">
                        <h2 className="lead">Account Details</h2>
                    </div>
                </div>
                <div className='col-10 mx-auto pt-4'>
                    <div className="form-floating mb-3">
                        <input type="email" readOnly className="form-control" id='editReadOnlyEmail' tabIndex="-1" value={email} />
                        <label htmlFor="editReadOnlyEmail">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" readOnly className="form-control" id='editReadOnlyUsername' tabIndex="-1" value={username} />
                        <label htmlFor="editReadOnlyUsername">Username</label>
                    </div>

                    <div className="d-grid col-8 mx-auto text-center my-4">
                        <button type="button" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1" data-bs-toggle="modal" data-bs-target="#edit-modal" data-bs-dismiss="modal">UPDATE ACCOUNT</button>
                    </div>
                    <div className="d-grid col-8 mx-auto text-center my-4">
                        <button type="button" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1" data-bs-toggle="modal" data-bs-target="#edit-password-modal" data-bs-dismiss="modal">UPDATE PASSWORD</button>
                    </div>

                    <Register type="edit" email={email} username={username} />
                    <PasswordModal />
                </div>

                <div className="row my-3 d-flex">
                    <div className="row text-center bg-warning pt-3 pb-2 mx-auto">
                        <h2 className="lead">Your Datasets</h2>
                    </div>
                    {(props.datasets) ? getPersonalDataSets() : "Loading"}
                </div>
            </div>
        </div>
    );
}

export default Profile;
