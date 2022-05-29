import React, {useState, useEffect} from 'react';
import Register from './Register';
import axios from 'axios';
import config from '../config.json';

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
        setDatasets(props.datasets);
        console.log(datasets);
    }, [props.datasets]);

    // handle profile edit request
    const handleEdit = (e) => {
        e.preventDefault();
    } 

    // const datasetLength = personalDatasets.length;

    const getPersonalDataSets = () => {
        let content = [];
        for (let i = 0; i < datasets.length; i++){
            if (userID === datasets[i].uploader_id){
                content.push(
                    <div className="d-flex flex-column align-items center mx-auto my-3" key={i}>
                        <div className="card personal" style={{width: "100%", cursor: "pointer"}}>
                            <div className="card-body d-flex flex-row justify-content-between">
                                <h5 className="card-title">{datasets[i].title}</h5>
                                <small className='timeleft'>1 h</small>
                            </div>
                            <div className="edit-btns d-flex float-end">
                                <i className="btn bi bi-pen"></i>
                                <i className="btn bi bi-trash3"></i>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return content;
    };

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id='profileOffCanvas' aria-labelledby='profileOffCanvasLabel' aria-hidden="true">
            <div className="offcanvas-header">
                <h5 id="profileOffCanvasLabel" className='title display-6'>PROFILE</h5>
                <button type='button' className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label='Close' tabIndex="-1"></button>
            </div>
            <div className="offcanvas-body">
                <div className="row my-3 d-flex">
                    <h2 className="lead">Account Details</h2>
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

                    <div className="d-grid col-6 mx-auto text-center my-4">
                        <button type="button" onClick={handleEdit} className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1" data-bs-toggle="modal" data-bs-target="#edit-modal" data-bs-dismiss="modal">EDIT</button>
                    </div>

                    <Register type="edit" />
                </div>

                <div className="row my-3 d-flex">
                    <h2 className="lead">Your Datasets</h2>

                    {getPersonalDataSets()}
                </div>
            </div>
        </div>
    );
}

export default Profile;
