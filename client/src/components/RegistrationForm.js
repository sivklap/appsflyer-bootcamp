// RegistrationForm - Pure JS (no JSX)
import React, { useEffect, useRef } from 'react';
import { fieldsConfig } from '../config/fieldsConfig';
import { registerUser } from '../api/api';

export default function RegistrationForm({ type }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = '';

    // Title
    const title = document.createElement('h2');
    title.textContent = type === 'mentor' ? 'Mentor Registration' : 'Mentee Registration';
    container.appendChild(title);

    // Form
  const form = document.createElement('form');
  form.className = 'registration-form';
    const formData = {};
    const statusP = document.createElement('p');
    statusP.style.marginTop = '10px';
    statusP.style.fontWeight = 'bold';

    fieldsConfig[type].forEach(field => {
      formData[field.name] = field.type === 'multiselect' ? [] : '';
      const label = document.createElement('label');
      label.textContent = field.label;
      label.htmlFor = field.name;
      form.appendChild(label);

      if (field.type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.name = field.name;
        textarea.value = '';
        textarea.required = !!field.required;
        textarea.oninput = (e) => { formData[field.name] = e.target.value; };
        form.appendChild(textarea);
      } else if (field.type === 'multiselect') {
        (field.options || []).forEach(option => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = option;
          checkbox.name = field.name;
          checkbox.onchange = (e) => {
            if (e.target.checked) {
              formData[field.name] = [...formData[field.name], option];
            } else {
              formData[field.name] = formData[field.name].filter(v => v !== option);
            }
          };
          form.appendChild(checkbox);
          const optLabel = document.createElement('span');
          optLabel.textContent = option;
          form.appendChild(optLabel);
        });
      } else {
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.value = '';
        input.required = !!field.required;
        input.oninput = (e) => { formData[field.name] = e.target.value; };
        form.appendChild(input);
      }
      form.appendChild(document.createElement('br'));
    });

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    form.appendChild(submitBtn);
    form.appendChild(statusP);

    form.onsubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(type, formData);
        statusP.textContent = '✅ Registered successfully!';
        statusP.style.color = 'green';
      } catch {
        statusP.textContent = '❌ Registration error';
        statusP.style.color = 'red';
      }
    };

    container.appendChild(form);
  }, [type]);

  return <div ref={containerRef} />;
}
