import React from 'react'

const Upload = () => {
    return (
        <div>
            <div className='modal fade p-5' id='upload-modal' aria-hidden='true' aria-labelledby='upload-modal' tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title display-6 mx-auto">Add New Dataset</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input type="file-title" className="form-control" id="file-title" />
                                    <label htmlFor="file-title">Title</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="addImage" className="form-label">Add Image</label>
                                    <input className="form-control" type="file" id="addImage" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fileUpload" className="form-label">Upload your files here</label>
                                    <input className="form-control" type="file" id="fileUpload" />
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
        </div>
    );
}

export default Upload;
