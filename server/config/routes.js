const routes = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    profile: '/auth/profile',
    updateProfile: '/auth/update-profile',
    logout: '/auth/logout',
  },
  users: {
    all: '/users',
    byId: (id) => `/users/${id}`,
    mentors: '/users/mentors',
    mentees: '/users/mentees',
    mentorById: (id) => `/users/mentors/${id}`
  },
  health: '/health'
};

module.exports = routes;
