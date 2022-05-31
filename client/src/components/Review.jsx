import React from 'react';
import Rating from './Rating';
import axios from 'axios';
import { useState, useEffect } from 'react';
import config from '../config.json';

const Review = (props) => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [dataset_id, setDataset_id] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const [commentErr, setCommentErr] = useState('');

    useEffect(() => {
        setDataset_id(props.datasetID);
    }, []);

    const validateData = (reviewBody) => {
        let review = reviewBody.review;
        let valid = true;

        if (review == ""){
            setCommentErr("Add a comment");
            valid = false;
        }
        else{
            setCommentErr("success");
        }

        return valid;
    }
    const handleReview = (e) => {
        e.preventDefault();

        const reviewBody = {rating, review, "dataset_id": props.datasetID};

        let valid = validateData(reviewBody);

        if (valid){
            const token = sessionStorage.getItem("token");
            setIsPending(true);
            if (props.type === "add"){

                    axios.post(config.domain + '/review', reviewBody, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', 
                        },
                    })
                    .then((res) => {
                        setIsPending(false);
                        setCommentErr(res.data.msg);
                        document.location.reload();
                        
                    }).catch((error) => {
                        setIsPending(false);
                        console.log(error.message);
                        sessionStorage.removeItem("token");
                        document.location.reload();
                });
            }
            else{
                axios.put(config.domain + '/review', reviewBody, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', 
                        },
                    })
                    .then((res) => {
                        setIsPending(false);
                        setCommentErr(res.data.msg);
                        document.location.reload();
                        
                    }).catch((error) => {
                        setIsPending(false);
                        console.log(error.message);
                        sessionStorage.removeItem("token");
                        document.location.reload();

                });
            }
            
        }
    }

    return (
        <div className='modal fade' id='addReview-modal' aria-hidden='true' aria-labelledby='addReview-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">ADD REVIEW</h2>
                        <form>
                            <Rating setRating={setRating} />
                            <div className="form-floating mx-3">
                                <textarea 
                                    className={`form-control ${(commentErr == "") ? "" : (commentErr == "success") ? "is-valid" : "is-invalid"}`}
                                    placeholder="Leave a comment here" 
                                    id="floatingTextarea" 
                                    style={{height: "150px"}}
                                    value={review}
                                    maxLength="200"
                                    onChange={(e) => setReview(e.target.value)}
                                ></textarea>
                                <label htmlFor="floatingTextarea">Comments</label>
                                <div className="invalid-feedback">
                                    {commentErr}
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="button" onClick={handleReview} className="btn btn-dark px-5 mt-3 mb-2 shadow-lg">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;
