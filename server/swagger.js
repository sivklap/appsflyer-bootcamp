require("dotenv").config();
const PORT = process.env.PORT;

const swaggerUi = require("swagger-ui-express");

const openapi = {
  openapi: "3.0.3",
  info: { 
    title: "AppsFlyer Bootcamp API", 
    version: "1.0.0",
    description: "API for the AppsFlyer Bootcamp application with MongoDB backend",
    contact: {
      name: "AppsFlyer Bootcamp Team",
      email: "support@appsflyer-bootcamp.com"
    }
  },
  servers: [
    { url: `http://localhost:${PORT}`, description: "Development server" },
    { url: "https://api.appsflyer-bootcamp.com", description: "Production server" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { 
        type: "http", 
        scheme: "bearer", 
        bearerFormat: "JWT",
        description: "JWT token obtained from login endpoint"
      }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { 
            type: "string", 
            description: "MongoDB ObjectId",
            example: "689b38c419c77b070af4c019"
          },
          firstName: { 
            type: "string", 
            description: "User's first name",
            example: "Dana"
          },
          lastName: { 
            type: "string", 
            description: "User's last name",
            example: "Levi"
          },
          email: { 
            type: "string", 
            format: "email", 
            description: "User's email address",
            example: "dana.levi.1@example.com"
          },
          phone: { 
            type: "string", 
            description: "User's phone number",
            example: "+972-54-1111111"
          },
          role: { 
            type: "string", 
            enum: ["mentor","mentee","admin"], 
            description: "User's role in the system",
            example: "mentor"
          },
          bio: { 
            type: "string", 
            description: "User's biography",
            example: "Frontend mentor specializing in React and TypeScript."
          },
          linkedinUrl: { 
            type: "string", 
            format: "uri", 
            description: "User's LinkedIn profile URL",
            example: "https://linkedin.com/in/dana-levi"
          },
          imageUrl: { 
            type: "string", 
            format: "uri", 
            description: "User's profile image URL",
            example: "https://example.com/avatar1.png"
          },
          codingLanguages: { 
            type: "array",
            items: { type: "string" },
            description: "Array of programming languages",
            example: ["JavaScript", "TypeScript", "HTML", "CSS"]
          },
          specialtyFields: { 
            type: "array",
            items: { type: "string" },
            description: "Array of specialty areas",
            example: ["Frontend", "React", "UI/UX"]
          },
          image: {
            type: "number",
            description: "Image index number",
            example: 0
          },
          createdAt: { 
            type: "string", 
            format: "date-time", 
            description: "User creation timestamp",
            example: "2025-08-12T12:45:00.000Z"
          },
          updatedAt: { 
            type: "string", 
            format: "date-time", 
            description: "User last update timestamp",
            example: "2025-08-12T12:45:00.000Z"
          },
          fullName: {
            type: "string",
            description: "Virtual field - user's full name",
            example: "Dana Levi"
          }
        },
        required: ["firstName", "lastName", "email", "role"]
      },
      SignupRequest: {
        type: "object",
        required: ["firstName","lastName","email","password"],
        properties: {
          firstName: { 
            type: "string", 
            description: "User's first name",
            example: "Dana"
          },
          lastName: { 
            type: "string", 
            description: "User's last name",
            example: "Levi"
          },
          email: { 
            type: "string", 
            format: "email", 
            description: "User's email address",
            example: "dana.levi.1@example.com"
          },
          password: { 
            type: "string", 
            format: "password", 
            minLength: 6,
            description: "User's password (minimum 6 characters)",
            example: "securepassword123"
          },
          phone: { 
            type: "string", 
            description: "User's phone number",
            example: "+972-54-1111111"
          },
          role: { 
            type: "string", 
            enum: ["mentor","mentee","admin"], 
            default: "mentee",
            description: "User's role in the system",
            example: "mentor"
          },
          bio: { 
            type: "string", 
            description: "User's biography",
            example: "Frontend mentor specializing in React and TypeScript."
          },
          linkedinUrl: { 
            type: "string", 
            format: "uri", 
            description: "User's LinkedIn profile URL",
            example: "https://linkedin.com/in/dana-levi"
          },
          imageUrl: { 
            type: "string", 
            format: "uri", 
            description: "User's profile image URL",
            example: "https://example.com/avatar1.png"
          },
          codingLanguages: { 
            type: "array",
            items: { type: "string" },
            description: "Array of programming languages",
            example: ["JavaScript", "TypeScript", "HTML", "CSS"]
          },
          specialtyFields: { 
            type: "array",
            items: { type: "string" },
            description: "Array of specialty areas",
            example: ["Frontend", "React", "UI/UX"]
          },
          image: {
            type: "number",
            description: "Image index number",
            example: 0
          }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email","password"],
        properties: {
          email: { 
            type: "string", 
            format: "email", 
            description: "User's email address",
            example: "dana.levi.1@example.com"
          },
          password: { 
            type: "string", 
            format: "password", 
            description: "User's password",
            example: "securepassword123"
          }
        }
      },
      AuthResponse: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/User" },
          token: { 
            type: "string", 
            description: "JWT authentication token",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        }
      },
      Error: {
        type: "object",
        properties: {
          error: { 
            type: "string", 
            description: "Error message",
            example: "User not found"
          }
        }
      }
    }
  },
  paths: {
    "/api/health": {
      get: { 
        summary: "Health check", 
        description: "Check if the API is running",
        tags: ["Health"],
        responses: { 
          "200": { 
            description: "API is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "QueenB Server is running!" },
                    timestamp: { type: "string", format: "date-time" },
                    status: { type: "string", example: "healthy" },
                    database: { type: "string", example: "MongoDB" }
                  }
                }
              }
            }
          } 
        } 
      }
    },
    "/api/auth/signup": {
      post: {
        summary: "Create account",
        description: "Register a new user account",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: { 
            "application/json": { 
              schema: { $ref: "#/components/schemas/SignupRequest" },
              example: {
                firstName: "Dana",
                lastName: "Levi",
                email: "dana.levi.1@example.com",
                password: "securepassword123",
                role: "mentor",
                phone: "+972-54-1111111",
                bio: "Frontend mentor specializing in React and TypeScript.",
                linkedinUrl: "https://linkedin.com/in/dana-levi",
                imageUrl: "https://example.com/avatar1.png",
                codingLanguages: ["JavaScript", "TypeScript", "HTML", "CSS"],
                specialtyFields: ["Frontend", "React", "UI/UX"],
                image: 0
              }
            } 
          } 
        },
        responses: { 
          "201": { 
            description: "Account created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" }
              }
            }
          }, 
          "400": { 
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "409": { 
            description: "Email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          } 
        } 
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Login",
        description: "Authenticate user and get JWT token",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: { 
            "application/json": { 
              schema: { $ref: "#/components/schemas/LoginRequest" },
              example: {
                email: "dana.levi.1@example.com",
                password: "securepassword123"
              }
            } 
          } 
        },
        responses: { 
          "200": { 
            description: "Login successful",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" }
              }
            }
          }, 
          "401": { 
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "400": { 
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          } 
        } 
      }
    },
    "/api/auth/profile": {
      get: {
        summary: "Get current user profile",
        description: "Retrieve the profile of the currently authenticated user",
        tags: ["Authentication"],
        security: [{ bearerAuth: [] }],
        responses: { 
          "200": { 
            description: "Profile retrieved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          }, 
          "401": { 
            description: "Unauthorized - Missing token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "403": { 
            description: "Forbidden - Invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          } 
        } 
      }
    },
    "/api/users": {
      get: {
        summary: "List users",
        description: "Retrieve a list of all users with optional pagination",
        tags: ["Users"],
        parameters: [{ 
          name: "limit", 
          in: "query", 
          description: "Maximum number of users to return",
          schema: { type: "integer", default: 20, minimum: 1, maximum: 1000 } 
        }],
        responses: { 
          "200": { 
            description: "List of users retrieved successfully",
            content: { 
              "application/json": { 
                schema: { 
                  type: "array", 
                  items: { $ref: "#/components/schemas/User" } 
                } 
              } 
            } 
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        } 
      },
      post: {
        summary: "Create user",
        description: "Create a new user (admin only)",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        requestBody: { 
          required: true, 
          content: { 
            "application/json": { 
              schema: { $ref: "#/components/schemas/SignupRequest" } 
            } 
          } 
        },
        responses: { 
          "201": { 
            description: "User created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          }, 
          "400": {
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "409": { 
            description: "Email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        } 
      }
    },
    "/api/users/{id}": {
      get: {
        summary: "Get user by id",
        description: "Retrieve a specific user by their MongoDB ObjectId",
        tags: ["Users"],
        parameters: [{ 
          name: "id", 
          in: "path", 
          required: true, 
          description: "MongoDB ObjectId",
          schema: { type: "string", example: "689b38c419c77b070af4c019" } 
        }],
        responses: { 
          "200": { 
            description: "User retrieved successfully",
            content: { 
              "application/json": { 
                schema: { $ref: "#/components/schemas/User" } 
              } 
            } 
          }, 
          "404": { 
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          } 
        } 
      },
      patch: {
        summary: "Update user",
        description: "Update an existing user's information",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ 
          name: "id", 
          in: "path", 
          required: true, 
          description: "MongoDB ObjectId",
          schema: { type: "string", example: "689b38c419c77b070af4c019" } 
        }],
        requestBody: { 
          required: true, 
          content: { 
            "application/json": { 
              schema: { $ref: "#/components/schemas/SignupRequest" } 
            } 
          } 
        },
        responses: { 
          "200": { 
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          }, 
          "400": {
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "404": { 
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "409": {
            description: "Email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        } 
      },
      delete: {
        summary: "Delete user",
        description: "Delete a user from the system",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ 
          name: "id", 
          in: "path", 
          required: true, 
          description: "MongoDB ObjectId",
          schema: { type: "string", example: "689b38c419c77b070af4c019" } 
        }],
        responses: { 
          "204": { 
            description: "User deleted successfully" 
          }, 
          "404": { 
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        } 
      }
    },
    "/api/users/mentors": {
      get: {
        summary: "List mentors",
        description: "Retrieve a list of all users with mentor role",
        tags: ["Mentors"],
        responses: { 
          "200": { 
            description: "List of mentors retrieved successfully",
            content: { 
              "application/json": { 
                schema: { 
                  type: "array", 
                  items: { $ref: "#/components/schemas/User" } 
                } 
              } 
            } 
          } 
        } 
      }
    },
    "/api/users/mentors/{id}": {
      get: {
        summary: "Get mentor by id",
        description: "Retrieve a specific mentor by their MongoDB ObjectId",
        tags: ["Mentors"],
        parameters: [{ 
          name: "id", 
          in: "path", 
          required: true, 
          description: "MongoDB ObjectId",
          schema: { type: "string", example: "689b38c419c77b070af4c019" } 
        }],
        responses: { 
          "200": { 
            description: "Mentor retrieved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          }, 
          "404": { 
            description: "Mentor not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          } 
        } 
      }
    },
    "/api/users/mentees": {
      get: {
        summary: "List mentees",
        description: "Retrieve a list of all users with mentee role",
        tags: ["Mentees"],
        responses: { 
          "200": { 
            description: "List of mentees retrieved successfully",
            content: { 
              "application/json": { 
                schema: { 
                  type: "array", 
                  items: { $ref: "#/components/schemas/User" } 
                } 
              } 
            } 
          } 
        } 
      }
    }
  },
  tags: [
    {
      name: "Health",
      description: "Health check endpoints"
    },
    {
      name: "Authentication",
      description: "Authentication and authorization operations"
    },
    {
      name: "Users",
      description: "User management operations"
    },
    {
      name: "Mentors",
      description: "Mentor-specific operations"
    },
    {
      name: "Mentees",
      description: "Mentee-specific operations"
    }
  ]
};

function mountSwagger(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "AppsFlyer Bootcamp API Documentation (MongoDB)"
  }));
}

module.exports = { mountSwagger };
