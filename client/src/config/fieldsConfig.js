
//############################
export const fieldsConfig = {
  mentor: [
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'languages', label: 'Technologies', type: 'multiselect', options: ['JavaScript', 'React', 'Python', 'Node.js', 'Java', 'C#'], required: true },
    { name: 'years_of_experience', label: 'Years of Experience', type: 'number', required: true , min: 1},
    { name: 'bio', label: 'General Description', type: 'textarea' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone_number', label: 'Phone', type: 'tel', required: true },
    { name: 'linkedin_url', label: 'LinkedIn', type: 'url' },
    { name: 'img', label: 'Avatar', type: 'select', options: [
      { label: 'Avatar 1', value: 'avatar-1.png' },
      { label: 'Avatar 2', value: 'avatar-2.png' },
      { label: 'Avatar 3', value: 'avatar-3.png' },
      { label: 'Avatar 4', value: 'avatar-4.png' }
    ], required: true }
  ],
  mentee: [
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone_number', label: 'Phone', type: 'tel', required: true },
    { name: 'bio', label: 'General Description', type: 'textarea' }
  ]
};
