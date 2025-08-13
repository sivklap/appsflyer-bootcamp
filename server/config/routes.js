const routes = {
  // Auth routes
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    profile: '/auth/profile',
    logout: '/auth/logout',
    updateProfile: '/auth/update-profile'
  },
  
  // User routes
  users: {
    all: '/users',
    byId: (id) => `/users/${id}`,
    mentors: '/users/mentors',
    mentees: '/users/mentees',
    mentorById: (id) => `/users/mentors/${id}`,
  },
  
  // Task routes (if you have them)
  tasks: {
    all: '/tasks',
    byId: (id) => `/tasks/${id}`,
    create: '/tasks',
    update: (id) => `/tasks/${id}`,
    delete: (id) => `/tasks/${id}`,
  },
  
  // Health check
  health: '/health',
  
  // Test routes
  test: {
    db: '/test-db',
  }
};

module.exports = routes;
