import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../features/authSlice';
import { useLoginMutation } from '../../features/authApiSlice';


const setCredentials = authActions.setCredentials;

function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userData = await login({ user, pwd }).unwrap();
            dispatch(setCredentials({ ...userData, user }));
            setUser('');
            setPwd('');
            navigate('/welcome');
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();            
            // if (!err?.originalStatus) setErrMsg('No Server Response'); // isLoading: true until timeout occurs
            // if (err.originalStatus === 400) setErrMsg('Missing Username or Password');
            // if (err.originalStatus === 401) setErrMsg('Unauthorized');
            // setErrMsg('Login Failed');
            // errRef.current.focus(); 
        }
    }

    function handleUserInput(e) {
        setUser(e.target.value);
    }

    function handlePwdInput(e) {
        setPwd(e.target.value);
    }

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Employee Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" ref={userRef} value={user} onChange={handleUserInput} autoComplete="off" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={handlePwdInput} value={pwd} required />
                <button>Sign In</button>
            </form>
        </section>
    );

    return content
}
export default Login;