import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import config from '../config.json'

const DatasetEditModel = (props) => {

    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending]     = useState(false);

    const [titleErr, setTitleErr]       = useState('');
    const [desErr, setDesErr]           = useState('');

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.description);
    }, []);

    const validateData = (edit) => {
        let title = edit.title;
        let description = edit.description;
        let valid = true;

        if (title === ""){
            setTitleErr("Please enter a title");
            valid = false;
        }
        else{
            setTitleErr("success");
        }
        
        if (description === ""){
            setDesErr("Please enter a description");
            valid = false;
        }
        else{
            setDesErr("success");
        }

        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(props.id);

        const token = sessionStorage.getItem("token");

        const body = {title, description};

        let valid = validateData(body);
        
        if (valid){
            setIsPending(true);

            axios.post(config.domain + '/updateDataSet', body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
            }})
                .then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <div className='modal fade p-5' id='dataset-edit-modal' aria-hidden='true' aria-labelledby='dataset-edit-modal' tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2 className="title display-6 my-4 text-center">EDIT DATASET</h2>
                                <form className='col-10 mx-auto pt-4'>
                                    {/* add the classnames "invalid" or "valid" to the input parent div to see error and success */}
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="text" 
                                            className={`form-control ${(titleErr === "") ? "" : (titleErr !== "success") ? "is-invalid" : "is-valid"}`} 
                                            id='floatingTitle' 
                                            tabIndex="-1" 
                                            value = {title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder='title'
                                            required
                                        />
                                        <label htmlFor="floatingTitle">Title</label>
                                        <div className="invalid-feedback">
                                            {titleErr}
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <textarea 
                                            className={`form-control ${(desErr === "") ? "" : (desErr !== "success") ? "is-invalid" : "is-valid"}`} 
                                            placeholder="Leave a comment here" 
                                            id="fileDescription" 
                                            style={{height: "100px"}}
                                            tabIndex="-1"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength="100"
                                            required
                                        ></textarea>
                                        <label htmlFor="fileDescription">Description</label>
                                        <div className="invalid-feedback">
                                            {desErr}
                                        </div>
                                    </div>
                                    
                                    <div className="d-grid col-6 mx-auto text-center my-4">
                                    { !isPending && <button type="submit" onClick={handleSubmit} className="btn btn-outline-dark py-2" tabIndex="-1">Upload</button>}
                                    { isPending && <button type="submit" className="btn btn-outline-dark py-2" tabIndex="-1" disabled>Upload</button>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default DatasetEditModel;
