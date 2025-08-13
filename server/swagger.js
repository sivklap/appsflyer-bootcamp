

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'QueenB API',
    version: '1.0.0',
    description: 'API for QueenB mentoring platform',
  },
  servers: [
    {
      url: 'http://localhost:5005/',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'User ID',
            example: '507f1f77bcf86cd799439011'
          },
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'John'
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com'
          },
          role: {
            type: 'string',
            enum: ['mentor', 'mentee'],
            description: 'User role',
            example: 'mentee'
          },
          phone: {
            type: 'string',
            nullable: true,
            description: 'User phone number',
            example: '+1234567890'
          },
          bio: {
            type: 'string',
            nullable: true,
            description: 'User bio',
            example: 'I am a passionate developer...'
          },
          linkedinUrl: {
            type: 'string',
            nullable: true,
            description: 'LinkedIn profile URL',
            example: 'https://linkedin.com/in/johndoe'
          },
          imageUrl: {
            type: 'string',
            nullable: true,
            description: 'Profile image URL',
            example: 'https://example.com/avatar.jpg'
          },
          codingLanguages: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Programming languages user knows',
            example: ['JavaScript', 'Python', 'React']
          },
          specialtyFields: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Areas of expertise',
            example: ['Frontend Development', 'Backend Development']
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation date',
            example: '2024-01-15T10:30:00.000Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update date',
            example: '2024-01-15T10:30:00.000Z'
          }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com'
          },
          password: {
            type: 'string',
            description: 'User password',
            example: 'password123'
          }
        }
      },
      SignupRequest: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password', 'role'],
        properties: {
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'John'
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com'
          },
          password: {
            type: 'string',
            description: 'User password',
            example: 'password123'
          },
          role: {
            type: 'string',
            enum: ['mentor', 'mentee'],
            description: 'User role',
            example: 'mentee'
          }
        }
      },
      UpdateProfileRequest: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'John'
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com'
          },
          phone: {
            type: 'string',
            description: 'User phone number',
            example: '+1234567890'
          },
          bio: {
            type: 'string',
            description: 'User bio',
            example: 'I am a passionate developer with 5 years of experience...'
          },
          linkedinUrl: {
            type: 'string',
            description: 'LinkedIn profile URL',
            example: 'https://linkedin.com/in/johndoe'
          },
          imageUrl: {
            type: 'string',
            description: 'Profile image URL',
            example: 'https://example.com/avatar.jpg'
          },
          codingLanguages: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Programming languages user knows',
            example: ['JavaScript', 'React', 'Node.js']
          },
          specialtyFields: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Areas of expertise',
            example: ['Frontend Development', 'Full Stack Development']
          }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/User'
          },
          token: {
            type: 'string',
            description: 'JWT token for authentication',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message',
            example: 'Invalid credentials'
          }
        }
      }
    }
  },
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Authentication'],
        summary: 'Create a new user account',
        description: 'Register a new user with basic information (firstName, lastName, email, password, role)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupRequest'
              },
              example: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'mentee'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse'
                }
              }
            }
          },
          400: {
            description: 'Invalid input data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          409: {
            description: 'Email already exists',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'User login',
        description: 'Authenticate user and return JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest'
              },
              example: {
                email: 'john.doe@example.com',
                password: 'password123'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse'
                }
              }
            }
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/auth/profile': {
      get: {
        tags: ['Authentication'],
        summary: 'Get user profile',
        description: 'Get current user profile information',
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'User profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized - Invalid or missing token',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/auth/update-profile': {
      patch: {
        tags: ['Authentication'],
        summary: 'Update user profile',
        description: 'Update current user profile information (for registration pages)',
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProfileRequest'
              },
              example: {
                phone: '+1234567890',
                bio: 'I am a passionate developer with 5 years of experience...',
                linkedinUrl: 'https://linkedin.com/in/johndoe',
                codingLanguages: ['JavaScript', 'React', 'Node.js'],
                specialtyFields: ['Frontend Development', 'Full Stack Development']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Profile updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          400: {
            description: 'Invalid input data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized - Invalid or missing token',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Retrieve a list of all users',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            description: 'Maximum number of users to return',
            required: false,
            schema: {
              type: 'integer',
              default: 100
            }
          }
        ],
        responses: {
          200: {
            description: 'List of users retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/users/mentors': {
      get: {
        tags: ['Users'],
        summary: 'Get all mentors',
        description: 'Retrieve a list of all mentors',
        responses: {
          200: {
            description: 'List of mentors retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/users/mentees': {
      get: {
        tags: ['Users'],
        summary: 'Get all mentees',
        description: 'Retrieve a list of all mentees',
        responses: {
          200: {
            description: 'List of mentees retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          200: {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'QueenB Server is running!'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      example: '2024-01-15T10:30:00.000Z'
                    },
                    status: {
                      type: 'string',
                      example: 'healthy'
                    },
                    database: {
                      type: 'string',
                      example: 'MongoDB'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

function mountSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = { mountSwagger };
