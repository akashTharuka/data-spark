import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = ({type}) => {

    // const [getMessage, setGetMessage] = useState({})

    // useEffect(()=>{
    //     // axios.get('http://localhost:5000/flask/hello').then(response => {
    //     //   console.log("SUCCESS", response)
    //     //   setGetMessage(response)
    //     // }).catch(error => {
    //     //   console.log(error)
    //     // })
    
    //   }, [])

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    // console.log(email, username, password, confirmPassword);
    const handleSubmit = (e) => {
        e.preventDefault();

        const register = {email, username, password, confirmPassword};

        setIsPending(true);

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register)
        }).then(() => {
            console.log('new user registered');
            setIsPending(false);
            // history.go(-1);
            history.push('/');
        })
    }

	return (
        <div className='modal fade' id={type + '-modal'} aria-hidden='true' aria-labelledby='register-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex-column">
                        <h2 className="title display-6 my-4 text-center text-uppercase">{type}</h2>
                        <form onSubmit={handleSubmit} className='col-10 mx-auto pt-4 needs-validation' noValidate>
                            {/* add the classnames "is-invalid" or "is-valid" to the input element to see error and success */}
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    className="form-control is-invalid" 
                                    id={type + 'Email'} 
                                    tabIndex="-1" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerEmail">Email address</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control is-invalid" 
                                    id={type + 'Username'} 
                                    tabIndex="-1" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerUsername">Username</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className="form-control is-valid" 
                                    id={type + 'Password'} 
                                    tabIndex="-1" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerPassword">Password</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id={type + 'ConfirmPassword'} 
                                    tabIndex="-1" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerConfirmPassword">Confirm Password</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                { !isPending && <button type="submit" className="btn btn-outline-dark py-2 shadow-lg text-uppercase" tabIndex="-1">{type}</button>}
                                { isPending && <button type="submit" className="btn btn-outline-dark py-2 shadow-lg text-uppercase" tabIndex="-1" disabled>{type}</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;
