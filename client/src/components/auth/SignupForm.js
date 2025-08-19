import React, { useState } from 'react';
import AvatarUpload from './AvatarUpload';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../api/authService';
import './AuthForms.css';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignupForm = ({availableLanguages}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'mentee', // default role
    phone_number: '',
    linkedin_url: '',
    bio: '',
    years_of_experience: 0,
    languages: [],
    img: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language]
    }));
  };

  const handleAvatarSelect = (avatarValue) => {
    setFormData(prev => ({
      ...prev,
      img: avatarValue
    }));
  };

  const handleAvatarFile = (file) => {
    if (!file) return;
    setFormData(prev => ({
      ...prev,
      img: file // File object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare FormData for multipart/form-data
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'img') {
          if (value && typeof value !== 'string') {
            data.append('img', value); // File object
          } else if (typeof value === 'string') {
            data.append('img', value);
          }
        } else if (key === 'languages') {
          value.forEach(lang => data.append('languages', lang));
        } else {
          data.append(key, value);
        }
      });
      // Debug: print all FormData values
      for (let pair of data.entries()) {
        console.log(pair[0]+ ':', pair[1]);
      }
      const response = await authService.signupFormData(data);
      if (response.user.role === 'mentee') {
        navigate('/mentors');
      } else if (response.user.role === 'mentor') {
        navigate('/mentor-home');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const avatarOptions = [
    { label: 'Avatar 1', value: '1' },
    { label: 'Avatar 2', value: '2' },
    { label: 'Avatar 3', value: '3' },
    { label: 'Avatar 4', value: '4' }
  ];

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h2>Create Account</h2>
        </div>

        {error && (
          <div className="status-message status-error">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="form-section">
            <h3 className="section-title">Choose Your Role</h3>
            <div className="form-group">
              <label htmlFor="role" className="form-label">I want to be a</label>
              <select
                id="role"
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="mentee">Mentee (Looking for guidance)</option>
                <option value="mentor">Mentor (Want to help others)</option>
              </select>
            </div>
          </div>

          {/* Basic Information - Same for both roles */}
          <div className="form-section">
            {/*<h3 className="section-title">Basic Information</h3>*/}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-input"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-input"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <InputLabel htmlFor="password" className="form-label">Password</InputLabel>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id="password"
                  name="password"
                  className="form-input"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <div className="form-group">
              <label htmlFor="phone_number" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                className="form-input"
                value={formData.phone_number}
                onChange={handleChange}
                required
                placeholder="0501234567"
              />
            </div>
          </div>

          {/* Mentor-specific fields */}
          {formData.role === 'mentor' && (
            <>
              {/* Professional Information */}
              <div className="form-section">
                {/*<h3 className="section-title">Professional Information</h3>*/}
                <div className="form-group">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="form-textarea"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your experience and what you can offer as a mentor..."
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="years_of_experience" className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    id="years_of_experience"
                    name="years_of_experience"
                    className="form-input"
                    value={formData.years_of_experience}
                    onChange={handleChange}
                    min="0"
                    max="50"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Languages & Technologies</label>
                  <div className="languages-grid">
                    {availableLanguages.map(language => (
                      <button
                        key={language}
                        type="button"
                        className={`language-btn ${formData.languages.includes(language) ? 'selected' : ''}`}
                        onClick={() => handleLanguageToggle(language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                  {formData.languages.length > 0 && (
                    <p className="selected-languages">
                      Selected: {formData.languages.join(', ')}
                    </p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin_url" className="form-label">LinkedIn</label>
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    className="form-input"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                

              </div>
            </>
          )}

          {/* Mentee-specific fields */}
          {formData.role === 'mentee' && (
            <div className="form-section">
              {/*<h3 className="section-title">Mentee Information</h3>*/}
              
              <div className="form-group">
                <label htmlFor="bio" className="form-label">General Description (Optional)</label>
                <textarea
                  id="bio"
                  name="bio"
                  className="form-textarea"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself and what you're looking to learn..."
                  rows="4"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Select an avatar or upload a photo</label>
            <div className="avatar-grid">
              {avatarOptions.map(avatar => (
                  <label key={avatar.value} className="avatar-option">
                    <input
                        type="radio"
                        name="img"
                        value={avatar.value}
                        checked={typeof formData.img === 'string' && formData.img === avatar.value}
                        onChange={() => handleAvatarSelect(avatar.value)}
                    />
                    <img
                        src={`/images/avatars/avatar-${avatar.value}.png`}
                        alt={avatar.label}
                        className="avatar-preview"
                    />
                    <span className="avatar-label">{avatar.label}</span>
                  </label>
              ))}
            </div>
            <div style={{marginTop: 12}}>
              <span style={{fontWeight: 500}}>Or upload an image from your computer:</span>
              <AvatarUpload onFileSelect={handleAvatarFile} />
            </div>
            {formData.img && typeof formData.img !== 'string' && (
                <div style={{marginTop: 8}}>
                  <img src={URL.createObjectURL(formData.img)} alt="Avatar Preview" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                </div>
            )}
          </div>
          
          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
