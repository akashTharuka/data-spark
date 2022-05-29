import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import config from '../config.json'

const Upload = () => {

    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile]               = useState('');
    const [isPending, setIsPending]     = useState(false);



    const [titleErr, setTitleErr]       = useState('');
    const [desErr, setDesErr]           = useState('');
    const [filepathErr, setFilepathErr] = useState('');


    const history = useHistory();

    const handleFile = (e) => {

        console.log(e.target.files);
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        console.log(file);
        console.log(description);
    }

    const validateData = (upload) => {
        let title = upload.title;
        let description = upload.description;
        let filepath = upload.filepath;
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

        if (filepath === ""){
            setFilepathErr("Please upload a file");
            valid = false;
        }
        else{
            setFilepathErr("success");
        }

        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        const upload = {title, description, file, token};

        let valid = validateData(upload);

        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('token', token);
        formdata.append('type', file.type);
        formdata.append('size', file.size);

        console.log(formdata);
        console.log(formdata.get('file'));
        
        if (valid){
            setIsPending(true);
        

            axios.post(config.domain + '/addDataSet', formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
            }})
                .then((res) => {
                    setIsPending(false);
                    setTitleErr(res.data.titleErr);
                    setDesErr(res.data.desErr);
                    setFilepathErr(res.data.filepathErr);
                    console.log(res.data);

                    if(res.data.titleErr==="success" && res.data.desErr==="success" && res.data.filepathErr==="success"){
                        console.log("here");
                        history.push('/');
                        // document.location.reload();
                    }

                }).catch((error) => {
                    setIsPending(false);
                    console.log(error);
                });

        }
        
    }

    return (
        <div>
            <div className='modal fade p-5' id='upload-modal' aria-hidden='true' aria-labelledby='upload-modal' tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2 className="title display-6 my-4 text-center">ADD DATASET</h2>
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
                                            required
                                        ></textarea>
                                        <label htmlFor="fileDescription">Description</label>
                                        <div className="invalid-feedback">
                                            {desErr}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label mx-3">Add Dataset Files</label>
                                        <input 
                                            className={`form-control ${(filepathErr === "") ? "" : (filepathErr !== "success") ? "is-invalid" : "is-valid"}`}
                                            type="file"
                                            accept=".csv,.txt"
                                            name='file'
                                            id="formFileMultiple" 
                                            tabIndex="-1" 
                                            onChange={(e) => handleFile(e)}
                                            multiple 
                                        />
                                        <div className="invalid-feedback">
                                            {filepathErr}
                                        </div>
                                    </div>

                                    {/* <div className="mb-3">
                                        <label htmlFor="formFileImage" className="form-label mx-3">Add Image</label>
                                        <input 
                                            className="form-control is-invalid" 
                                            type="file" id="formFileImage" 
                                            tabIndex="-1" 
                                        />
                                        <div className="invalid-feedback">
                                            Error message
                                        </div>
                                    </div> */}
                                    
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

export default Upload;
