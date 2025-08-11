//############################

import { useState } from 'react';
import { fieldsConfig } from '../config/fieldsConfig';
import FormField from './FormField';
import { registerUser } from '../api/api';

export default function RegistrationForm({ type }) {
  const initialData = {};
  fieldsConfig[type].forEach(field => {
    initialData[field.name] = field.type === 'multiselect' ? [] : '';
  });

  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(type, formData);
      setStatus('✅ נרשמת בהצלחה!');
    } catch {
      setStatus('❌ שגיאה בהרשמה');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'mentor' ? 'הרשמת מנטורית' : 'הרשמת מנטית'}</h2>
      {fieldsConfig[type].map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}
      <button type="submit">שליחה</button>
      {status && <p>{status}</p>}
    </form>
  );
}
