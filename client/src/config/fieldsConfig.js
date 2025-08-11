
//############################
export const fieldsConfig = {
  mentor: [
    { name: 'firstName', label: 'שם פרטי', type: 'text', required: true },
    { name: 'lastName', label: 'שם משפחה', type: 'text', required: true },
    { name: 'skills', label: 'טכנולוגיות', type: 'multiselect', options: ['JavaScript', 'React', 'Python', 'Node.js', 'Java', 'C#'], required: true },
    { name: 'experience', label: 'שנות ניסיון', type: 'number', required: true },
    { name: 'description', label: 'תיאור כללי', type: 'textarea' },
    { name: 'email', label: 'אימייל', type: 'email', required: true },
    { name: 'phone', label: 'טלפון', type: 'tel', required: true },
    { name: 'linkedin', label: 'LinkedIn', type: 'url' }
  ],
  mentee: [
    { name: 'firstName', label: 'שם פרטי', type: 'text', required: true },
    { name: 'lastName', label: 'שם משפחה', type: 'text', required: true },
    { name: 'email', label: 'אימייל', type: 'email', required: true },
    { name: 'phone', label: 'טלפון', type: 'tel', required: true },
    { name: 'description', label: 'תיאור כללי', type: 'textarea' }
  ]
};
