// // SignUpPage.js
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/css/css/SignUpPage.css';
// import bgimage from '../../assets/images/Hindu_Devotional_Bac.png'
// import { useNavigate } from 'react-router-dom';

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     otp: ''
//   });
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [step, setStep] = useState(1);
//   const [showToast, setShowToast] = useState(false);
//    const navigate = useNavigate();

//   const generateOtp = () => {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(otp);
//     alert(`OTP sent to ${formData.phone}: ${otp}`);
//     setStep(2);
//   };

//   const verifyOtp = () => {
//   if (formData.otp === generatedOtp) {
//     setShowToast(true); // Show toast

//     setTimeout(() => {
//       setShowToast(false); // Hide toast
//       navigate('/login'); // Navigate to login page
//     }, 3000);
//   } else {
//     alert('Invalid OTP. Please try again.');
//   }
// };

//   return (
//     <div className="signup-wrapper" 
//     style={{
//   backgroundImage: `url(${bgimage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat'
// }}>
//       <div className="card p-4 shadow-sm">
//         <h3 className="mb-4 text-center text-gradient">Sign Up</h3>
//         {step === 1 ? (
//           <form onSubmit={(e) => { e.preventDefault(); generateOtp(); }}>
//             {/* Form fields */}
//             <div className="mb-3">
//               <label className="form-label">Full Name</label>
//               <input type="text" className="form-control" value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Email ID</label>
//               <input type="email" className="form-control" value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Phone Number</label>
//               <input type="text" className="form-control" value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input type="password" className="form-control" value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
//             </div>
//             <button type="submit" className="btn btn-success w-100">Send OTP</button>
//           </form>
//         ) : (
//           <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
//             <div className="mb-3">
//               <label className="form-label">Enter OTP</label>
//               <input type="text" className="form-control" value={formData.otp}
//                 onChange={(e) => setFormData({ ...formData, otp: e.target.value })} required />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
//           </form>
//         )}
//       </div>

//       {/* Toast Message */}
// {showToast && (
//   <div className="toast-with-progress centered-toast">
//     <div className="toast-content">
//       <span>✔️ Signup successful! Welcome, {formData.name}.</span>
//     </div>
//     <div className="toast-progress"></div>
//   </div>
// )}
// <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default SignUpPage;

import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase'; // ✅ make sure this exports getAuth(app)
import bgimage from '../../assets/images/Hindu_Devotional_Bac.png';
import '../../assets/css/css/SignUpPage.css';

const SignUp = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  console.log('auth object:', auth);

  // ✅ Fixed Recaptcha initialization
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // ✅ auth comes first
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved');
          }
        }
      );
    }
  };

  const sendOTP = () => {
    if (!phone.startsWith('+91')) {
      alert('Please enter phone number in +91XXXXXXXXXX format');
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        alert('OTP sent to your phone!');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Check the phone number.');
      });
  };

  const verifyOTP = () => {
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log('User signed in:', user);
        setVerified(true);
        alert('✅ Phone number verified successfully!');
      })
      .catch((error) => {
        console.error('OTP verification failed:', error);
        alert('Invalid OTP. Please try again.');
      });
  };

  return (
    <div
      className="signup-wrapper"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center text-gradient">📿 Devotional Sign Up</h3>

        {!verified ? (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter phone number (+91XXXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="btn btn-success w-100 mb-3" onClick={sendOTP}>
              Send OTP
            </button>

            {otpSent && (
              <>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-primary w-100" onClick={verifyOTP}>
                  Verify OTP
                </button>
              </>
            )}
          </>
        ) : (
          <div className="text-center">
            <h5 className="text-success">✅ Verified</h5>
            <p className="text-muted">Welcome to the divine experience.</p>
          </div>
        )}

        {/* Required for reCAPTCHA */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignUp;
