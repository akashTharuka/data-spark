import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config.json';

const AcceptModel = (props) => {

    const [category, setCategory] = useState(null);
    const [categoryMsg, setCategoryMsg] = useState("");

    // useEffect(() => {
    //     console.log(category);
    // }, [category]);

    const validateData = (category) => {
        let valid = true;

        if (! category){
            valid = false;
            setCategoryMsg("Assign a Category");
        }
        else{
            setCategoryMsg("Success");
        }

        return valid;
    }

    const handleAccept = (e) => {
        e.preventDefault();

        const access_token = sessionStorage.getItem("admin_token");

        const valid = validateData(category);

        if (valid){
            const body = {"dataset_id": props.id, "category": category}

            axios.put(config.domain + '/changeStatus', body, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data.message);
                    if (response.data.valid){
                        document.location = "/dashboard";
                    }
                })
                .catch(error => {
                    console.log(error);
                    sessionStorage.removeItem("admin_token");
                    document.location = "/adminlogin";
                })
        }
	}

    return (
        <div className='modal fade' id='accept-modal' aria-hidden='true' aria-labelledby='accept-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">CONFIRM</h2>
                        <div className="row my-3 justify-content-center">
                            <div className="col-10 mx-auto">
                                <form className=' needs-validation' noValidate>
                                    <select className={`form-select ${(categoryMsg === "") ? "" : (categoryMsg === "Success") ? "is-valid" : "is-invalid"}`} aria-label="category-select" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Education">Education</option>
                                        <option value="Data Visualization">Data Visualization</option>
                                        <option value="Pre-trained Modal">Pre-trained Modal</option>
                                        <option value="All">All</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {categoryMsg}
                                    </div>
                                    
                                    <div className="row my-3 justify-content-evenly">
                                        <div className="col-4 d-flex justify-content-end">
                                            <button type="button" className="btn btn-outline-dark px-5 my-5 shadow-lg" data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                        <div className="col-4 d-flex justify-content-start">
                                            <button type="submit" onClick={(e) => handleAccept(e)} className="btn btn-dark px-5 my-5 shadow-lg">Confirm</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcceptModel;