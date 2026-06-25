import React from "react";

export const RegistrationForm = ({ formData, errors, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="register-form" noValidate>
      <div className="form-group">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="UserName"
          autoComplete="username"
        />
        {errors.username && <span className="error-text">{errors.username}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          autoComplete="tel"
        />
        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
      </div>

      <div className="form-checkbox-container">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="terms-checkbox"
        />
        <label htmlFor="agreeTerms" className="terms-label">
          Share my registration data with Superapp
        </label>
      </div>
      {errors.agreeTerms && <p className="error-text terms-error">{errors.agreeTerms}</p>}

      <button type="submit" className="submit-btn">
        SIGN UP
      </button>
    </form>
  );
};

export default RegistrationForm;
