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
        // Custom button-based multi-select
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexWrap = 'wrap';
        wrapper.style.gap = '10px';
        const selected = [];
        (field.options || []).forEach(option => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = option;
          btn.style.padding = '8px 16px';
          btn.style.border = '1.5px solid #4f46e5';
          btn.style.borderRadius = '20px';
          btn.style.background = '#fff';
          btn.style.color = '#4f46e5';
          btn.style.cursor = 'pointer';
          btn.style.transition = 'all 0.2s';
          btn.onclick = () => {
            const idx = selected.indexOf(option);
            if (idx === -1) {
              selected.push(option);
              btn.style.background = '#4f46e5';
              btn.style.color = '#fff';
            } else {
              selected.splice(idx, 1);
              btn.style.background = '#fff';
              btn.style.color = '#4f46e5';
            }
            formData[field.name] = [...selected];
            selectedDisplay.textContent = selected.length ? 'Selected: ' + selected.join(', ') : '';
          };
          wrapper.appendChild(btn);
        });
        form.appendChild(wrapper);
        // Show selected options below
        const selectedDisplay = document.createElement('div');
        selectedDisplay.style.fontSize = '0.95em';
        selectedDisplay.style.color = '#4f46e5';
        selectedDisplay.style.margin = '10px 0 10px 0';
        form.appendChild(selectedDisplay);
      } else if (field.type === 'select' && field.name === 'img') {
        // Visual avatar selection
        const avatarWrapper = document.createElement('div');
        avatarWrapper.style.display = 'flex';
        avatarWrapper.style.gap = '20px';
        (field.options || []).forEach(opt => {
          const avatarLabel = document.createElement('label');
          avatarLabel.style.cursor = 'pointer';
          avatarLabel.style.display = 'flex';
          avatarLabel.style.flexDirection = 'column';
          avatarLabel.style.alignItems = 'center';
          avatarLabel.style.border = '2px solid transparent';
          avatarLabel.style.borderRadius = '50%';
          avatarLabel.style.padding = '5px';

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
            avatarLabel.style.border = '2px solid #4f46e5';
          };
          avatarLabel.appendChild(radio);

          const img = document.createElement('img');
          img.src = opt.value;
          img.alt = opt.label;
          img.style.width = '64px';
          img.style.height = '64px';
          img.style.borderRadius = '50%';
          img.style.objectFit = 'cover';
          avatarLabel.appendChild(img);

          const caption = document.createElement('span');
          caption.textContent = opt.label;
          avatarLabel.appendChild(caption);

          avatarWrapper.appendChild(avatarLabel);
        });
        form.appendChild(avatarWrapper);
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
