import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import RegistrationForm from "../components/RegistrationForm";
import signupImage from "../assets/signupImage.png";

export const Register = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.name.trim()) {
      tempErrors.name = "Name field cannot be left blank.";
    } else if (!namePattern.test(formData.name.trim())) {
      tempErrors.name = "Name must only contain alphabetic characters.";
    }

    if (!formData.username.trim()) {
      tempErrors.username = "Username field cannot be left blank.";
    } else if (!usernamePattern.test(formData.username.trim())) {
      tempErrors.username = "Username must be alphanumeric with no spaces.";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email field cannot be left blank.";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please input a valid email formatting schema.";
    }

    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile field cannot be left blank.";
    } else if (!phonePattern.test(formData.mobile)) {
      tempErrors.mobile = "Mobile field must encompass exactly 10 digital characters.";
    }

    if (!formData.agreeTerms) {
      tempErrors.agreeTerms = "Check this box to proceed.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear errors inline as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setUser({
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile,
      });
      navigate("/categories");
    }
  };

  return (
    <div className="register-page">
      {/* Left panel with hero artwork */}
      <div className="register-art-panel">
        <img src={signupImage} className="register-art-image" alt="Super App Discovery" />
        <div className="register-art-overlay"></div>
        <div className="register-art-content">
          <h1 className="register-art-title">Discover new things on Superapp</h1>
        </div>
      </div>

      {/* Right panel with registration form */}
      <div className="register-form-panel">
        <div className="register-form-container">
          <div className="register-header">
            <h2 className="register-logo">Super app</h2>
            <p className="register-subtitle">Create your new account</p>
          </div>
          <RegistrationForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <div className="form-disclaimers">
            <p className="form-disclaimer-text">
              By clicking on Sign up. you agree to Superapp <a href="#" className="green-link">Terms and Conditions of Use</a>
            </p>
            <p className="form-disclaimer-text">
              To learn more about how Superapp collects, uses, shares and protects your personal data please head <a href="#" className="green-link">Superapp Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
