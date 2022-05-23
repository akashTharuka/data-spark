import React from 'react';
import Rating from './Rating';
import axios from 'axios';

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

                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-dark px-5 mt-3 mb-2 shadow-lg">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;
