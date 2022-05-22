import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const history = useHistory();

    const validateData = (login) => {
        let valid = true;

        let email = login.email;
        let password = login.password;

        if (email == "" || password == ""){
            setErrMsg("Authentication Error");
            valid = false;
        }
        else{
            setErrMsg("");
        }

        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const login = {email, password};

        let valid = validateData(login);

        if (valid){
            setIsPending(true);

            axios.post('http://localhost:5000/login', login)
                .then((res) => {
                    console.log(res);
                    sessionStorage.setItem("token", res.data.access_token);
                    setIsPending(false);
                    history.push('/');
                    document.location.reload();
                }).catch((error) => {
                    setIsPending(false);
                    console.log(error);
                });
        }
    }

    return (
        <div className='modal fade' id='login-modal' aria-hidden='true' aria-labelledby='login-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">LOGIN</h2>
                        <form className='col-10 mx-auto pt-4'>
                            {/* add the classnames "invalid" or "valid" to the input parent div to see error and success */}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id='loginEmail'
                                    tabIndex="-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                     />
                                <label htmlFor="loginEmail">Email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id='loginPassword'
                                    tabIndex="-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                     />
                                <label htmlFor="loginPassword">Password</label>
                            </div>
                            
                            <div className={`err-div ${(errMsg == "") ? "d-none" : ""}`}>
                                <small className="err-msg text-danger">
                                    <i className="fa fa-exclamation-circle me-2 text-danger"></i>
                                    {errMsg}
                                </small>
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                { !isPending && <button type="submit" onClick={handleSubmit} className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1">LOGIN</button>}
                                { isPending && <button type="submit" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1">LOGIN</button>}

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
