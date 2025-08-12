// FormField 
import React, { useEffect, useRef } from 'react';

export default function FormField({ field, value, onChange }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = '';

    // Create label
    const label = document.createElement('label');
    label.textContent = field.label;
    label.htmlFor = field.name;
    container.appendChild(label);

    // Create input/textarea/multiselect
    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.value = value;
      input.name = field.name;
      input.required = !!field.required;
      input.oninput = (e) => onChange({ target: { name: field.name, value: e.target.value } });
    } else if (field.type === 'multiselect') {
      input = document.createElement('div');
      (field.options || []).forEach(option => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = option;
        checkbox.checked = value.includes(option);
        checkbox.name = field.name;
        checkbox.onchange = (e) => {
          if (e.target.checked) {
            onChange({ target: { name: field.name, value: [...value, option] } });
          } else {
            onChange({ target: { name: field.name, value: value.filter(v => v !== option) } });
          }
        };
        input.appendChild(checkbox);
        const optLabel = document.createElement('span');
        optLabel.textContent = option;
        input.appendChild(optLabel);
        input.appendChild(document.createElement('br'));
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;
      input.value = value;
      input.name = field.name;
      input.required = !!field.required;
      input.oninput = (e) => onChange({ target: { name: field.name, value: e.target.value } });
    }
    container.appendChild(input);
  }, [field, value, onChange]);

  return <div ref={containerRef} />;
}
