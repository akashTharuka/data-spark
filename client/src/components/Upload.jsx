import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

const Upload = () => {



    const [title, setTitle] = useState('');
    const [file_path, setFilepath] = useState('');
    const [isPending, setIsPending] = useState(false);


    const history = useHistory();

    console.log(title, file_path);
    const handleSubmit = (e) => {
        e.preventDefault();

        const upload = {title, file_path };

        setIsPending(true);

        fetch('http://localhost:5000/adddataset', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(upload)
        }).then(() => {
            console.log('new dataset added');
            setIsPending(false);
            // history.go(-1);
            history.push('/');
        })
    }

    return (
        <div>
            <div className='modal fade p-5' id='upload-modal' aria-hidden='true' aria-labelledby='upload-modal' tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2 className="title display-6 my-4 text-center">ADD DATASET</h2>
                                <form onSubmit={handleSubmit} className='col-10 mx-auto pt-4'>
                                    {/* add the classnames "invalid" or "valid" to the input parent div to see error and success */}
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control is-valid"  
                                            id='floatingTitle' 
                                            tabIndex="-1" 
                                            value = {title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="floatingTitle">Title</label>
                                        <div className="invalid-feedback">
                                            Error message
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label mx-3">Add Dataset Files</label>
                                        <input 
                                            className="form-control is-valid" 
                                            type="file"
                                            id="formFileMultiple" 
                                            tabIndex="-1" 
                                            value={file_path}
                                            onChange={(e) => setFilepath(e.target.value)}
                                            multiple 
                                        />
                                        <div className="invalid-feedback">
                                            Error message
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
                                    { !isPending && <button type="submit" className="btn btn-outline-dark py-2" tabIndex="-1">Upload</button>}
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
