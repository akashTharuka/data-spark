import React from 'react'

const Upload = () => {
    return (
        <div>
            <div className='modal fade' id='upload-modal' aria-hidden='true' aria-labelledby='upload-modal' tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                          <div className="modal-body">
                              <div className="form-floating mb-3">
                                  <input type="file-title" className="form-control" id="file-title" />
                                  <label htmlFor="file-title">Title</label>
                              </div>
                              <div class="mb-3">
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
