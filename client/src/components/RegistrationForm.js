// RegistrationForm - Pure JS (no JSX)
import React, { useEffect, useRef } from 'react';
import { fieldsConfig } from '../config/fieldsConfig';
import { authService } from '../api/authService';
import './RegistrationForm.css';

export default function RegistrationForm({ type }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = '';

    // Title
    const title = document.createElement('h2');
    title.textContent = type === 'mentor' ? 'Mentor Registration' : 'Mentee Registration';
    title.className = 'registration-title';
    container.appendChild(title);

    // Form
    const form = document.createElement('form');
    form.className = 'registration-form';
    const formData = {};
    const statusP = document.createElement('p');
    statusP.className = 'status-message';
    statusP.style.marginTop = '10px';
    statusP.style.fontWeight = 'bold';

    // Set the role based on the form type
    formData.role = type;

    fieldsConfig[type].forEach(field => {
      formData[field.name] = field.type === 'multiselect' ? [] : '';
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';
      
      const label = document.createElement('label');
      label.textContent = field.label;
      label.className = 'form-label';
      label.htmlFor = field.name;
      formGroup.appendChild(label);

      if (field.type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.name = field.name;
        textarea.className = 'form-textarea';
        textarea.value = '';
        textarea.required = !!field.required;
        textarea.oninput = (e) => { formData[field.name] = e.target.value; };
        formGroup.appendChild(textarea);
      } else if (field.type === 'multiselect') {
        // Custom button-based multi-select
        const wrapper = document.createElement('div');
        wrapper.className = 'multiselect-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.flexWrap = 'wrap';
        wrapper.style.gap = '10px';
        const selected = [];
        (field.options || []).forEach(option => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = option;
          btn.className = 'multiselect-btn';
          btn.onclick = () => {
            const idx = selected.indexOf(option);
            if (idx === -1) {
              selected.push(option);
              btn.classList.add('selected');
            } else {
              selected.splice(idx, 1);
              btn.classList.remove('selected');
            }
            formData[field.name] = [...selected];
            selectedDisplay.textContent = selected.length ? 'Selected: ' + selected.join(', ') : '';
          };
          wrapper.appendChild(btn);
        });
        formGroup.appendChild(wrapper);
        // Show selected options below
        const selectedDisplay = document.createElement('div');
        selectedDisplay.className = 'selected-display';
        formGroup.appendChild(selectedDisplay);
      } else if (field.type === 'select' && field.name === 'img') {
        // Visual avatar selection
        const avatarWrapper = document.createElement('div');
        avatarWrapper.className = 'avatar-wrapper';
        (field.options || []).forEach(opt => {
          const avatarLabel = document.createElement('label');
          avatarLabel.className = 'avatar-label';
          avatarLabel.style.cursor = 'pointer';

          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = field.name;
          radio.value = opt.value;
          radio.style.display = 'none';
          radio.onchange = (e) => {
            formData[field.name] = e.target.value;
            // Highlight selected avatar
            Array.from(avatarWrapper.children).forEach(child => {
              child.style.border = '2px solid transparent';
            });
            avatarLabel.style.border = '2px solid #D8A48F';
          };
          avatarLabel.appendChild(radio);

          const img = document.createElement('img');
          img.src = opt.value;
          img.alt = opt.label;
          img.className = 'avatar';
          avatarLabel.appendChild(img);

          const caption = document.createElement('span');
          caption.textContent = opt.label;
          caption.className = 'avatar-caption';
          avatarLabel.appendChild(caption);

          avatarWrapper.appendChild(avatarLabel);
        });
        formGroup.appendChild(avatarWrapper);
      } else {
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.className = 'form-input';
        input.value = '';
        input.required = !!field.required;
        input.oninput = (e) => { formData[field.name] = e.target.value; };
        formGroup.appendChild(input);
      }
      form.appendChild(formGroup);
    });

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'btn btn-primary auth-submit';
    form.appendChild(submitBtn);
    form.appendChild(statusP);

    form.onsubmit = async (e) => {
      e.preventDefault();
      try {
        console.log('Form data being sent:', formData);
        const response = await authService.signup(formData);
        statusP.textContent = 'Registered successfully!';
        statusP.className = 'status-message status-success';
        
        // Redirect based on user role
        setTimeout(() => {
          if (response.user.role === 'mentee') {
            window.location.href = '/mentors';
          } else if (response.user.role === 'mentor') {
            window.location.href = '/mentor-home';
          }
        }, 1500); // Wait 1.5 seconds to show success message
        
      } catch (error) {
        console.error('Registration error:', error);
        statusP.textContent = 'Registration error';
        statusP.className = 'status-message status-error';
      }
    };

    container.appendChild(form);
  }, [type]);

  return <div ref={containerRef} className="registration-container" />;
}
