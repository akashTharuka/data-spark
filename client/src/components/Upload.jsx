import React from 'react'

const Upload = () => {
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
                                        <input type="text" className="form-control" id='floatingTitle' />
                                        <label htmlFor="floatingTitle">Title<i className="fa fa-check-circle ms-3 text-success success"></i></label>
                                        <div className="error">
                                            <i className="fa fa-exclamation-circle me-3 text-danger"></i>
                                            <small className="err-msg text-danger">Error Message</small>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label mx-3">Add Dataset Files</label>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                                        <div className="error">
                                            <i className="fa fa-exclamation-circle me-3 text-danger"></i>
                                            <small className="err-msg text-danger">Error Message</small>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFileImage" className="form-label mx-3">Add Image</label>
                                        <input className="form-control" type="file" id="formFileImage" />
                                        <div className="error">
                                            <i className="fa fa-exclamation-circle me-3 text-danger"></i>
                                            <small className="err-msg text-danger">Error Message</small>
                                        </div>
                                    </div>

                                    <div className="d-grid col-6 mx-auto text-center my-4">
                                        <button type="submit" className="btn btn-outline-dark py-2">UPLOAD</button>
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
