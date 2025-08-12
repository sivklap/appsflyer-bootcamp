
//############################
export const fieldsConfig = {
  mentor: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'skills', label: 'Technologies', type: 'multiselect', options: ['JavaScript', 'React', 'Python', 'Node.js', 'Java', 'C#'], required: true },
    { name: 'experience', label: 'Years of Experience', type: 'number', required: true },
    { name: 'description', label: 'General Description', type: 'textarea' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'linkedin', label: 'LinkedIn', type: 'url' }
  ],
  mentee: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'description', label: 'General Description', type: 'textarea' }
  ]
};
