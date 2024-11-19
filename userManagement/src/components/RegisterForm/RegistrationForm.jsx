import './RegistrationForm.css';
const RegisterForm = () => {
    return (
        <div className="registration-container">
            <h2 className="registration-title">REGISTRATION PAGE</h2>
            <form className="registration-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email ID:</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile No:</label>
                    <input type="tel" id="mobile" placeholder="Enter your mobile number" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;