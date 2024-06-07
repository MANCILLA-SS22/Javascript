// Using custom Hooks
import Input from './Input';
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation.js'
import { useInput } from '../hooks/useInput';

function StateLogin() {
    const { value: emailValue,  handleInputChange: handleEmaillChange,  handleInputBlur: handleEmailBlur,  hasError: emailHasError } = useInput("", (res) => isEmail(res) && isNotEmpty(res))
    const { value: passwordValue,  handleInputChange: handlePasswordChange, handleInputBlur: handlePasswordBlur,  hasError: passwordHasError } = useInput("", (res) => hasMinLength(res, 6));

    function handleSubmit(event) {
        event.preventDefault();
        if (emailHasError || passwordHasError) return;
        console.log(emailValue, passwordValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="control-row">
                <Input label="Email" id="email" error={emailHasError && "Please enter a valid email!"} type="email" name="email" value={emailValue} onChange={handleEmaillChange}  onBlur={handleEmailBlur}/>
                <Input label="Password" id="password" error={passwordHasError && "Please enter a valid password!"} type="password" name="password" value={passwordValue} onChange={handlePasswordChange} onBlur={handlePasswordBlur} />
            </div>
            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
};

export default StateLogin;