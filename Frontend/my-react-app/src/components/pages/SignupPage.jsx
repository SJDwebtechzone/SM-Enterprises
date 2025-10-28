import React from 'react';
import AuthLayout from './AuthLayout';
import bgImage from '../../assets/images/bg_8.jpg'; // Same or different image

const SignupPage = () => {
  return (
    <AuthLayout imageSrc={bgImage}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" placeholder="Enter full name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Create password" />
        </div>
        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;