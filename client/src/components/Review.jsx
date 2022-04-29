import React from 'react';
import Rating from './Rating';

const Review = () => {
    return (
        <div className='modal fade' id='addReview-modal' aria-hidden='true' aria-labelledby='addReview-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">ADD REVIEW</h2>
                        <form>
                            <Rating />
                            <div className="form-floating mx-3">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{height: "150px"}}></textarea>
                                <label htmlFor="floatingTextarea">Comments</label>
                            </div>
                        </form>
                        <div className="row my-3 justify-content-evenly">
                            <div className="col-4 d-flex justify-content-end">
                                <button type="button" className="btn btn-outline-dark px-5 my-2 shadow-lg" data-bs-dismiss="modal">Cancel</button>
                            </div>
                            <div className="col-4 d-flex justify-content-start">
                                <button type="button" className="btn btn-dark px-5 my-2 shadow-lg">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;
