import axios from 'axios';
import config from '../config.json';

const ConfirmModel = (props) => {

    const handleConfirm = (e) => {
        e.preventDefault();

        const access_token = sessionStorage.getItem("token");

        const body = {"dataset_id": props.id}

        axios.post(config.domain + '/deleteDataset', body, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                
                document.location.reload();
            })
            .catch(error => {
                
                document.location.reload();
            })
	}

    return (
        <div className='modal fade' id='confirm-modal' aria-hidden='true' aria-labelledby='confirm-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">CONFIRM</h2>
                        <div className="row my-3 justify-content-evenly">
                            <div className="col-4 d-flex justify-content-end">
                                <button type="button" className="btn btn-outline-dark px-5 my-5 shadow-lg" data-bs-dismiss="modal">Cancel</button>
                            </div>
                            <div className="col-4 d-flex justify-content-start">
                                <button type="submit" onClick={(e) => handleConfirm(e)} className="btn btn-dark px-5 my-5 shadow-lg">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModel;