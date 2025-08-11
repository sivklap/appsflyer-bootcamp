const swaggerUi = require("swagger-ui-express");

const openapi = {
  openapi: "3.0.3",
  info: { title: "QueenB API", version: "1.0.0" },
  servers: [{ url: "http://localhost:5002" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          email: { type: "string", format: "email" },
          phone: { type: "string" },
          role: { type: "string", enum: ["mentor","mentee","admin"] },
          bio: { type: "string" },
          linkedin_url: { type: "string" },
          image_url: { type: "string" },
          coding_languages: { type: "string", description: "CSV list" },
          specialty_fields: { type: "string", description: "CSV list" },
          created_at: { type: "string", format: "date-time" }
        }
      },
      SignupRequest: {
        type: "object",
        required: ["first_name","last_name","email","password"],
        properties: {
          first_name: { type: "string" },
          last_name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
          phone: { type: "string" },
          role: { type: "string", enum: ["mentor","mentee","admin"], default: "mentee" },
          bio: { type: "string" },
          linkedin_url: { type: "string" },
          image_url: { type: "string" },
          coding_languages: { type: "string" },
          specialty_fields: { type: "string" }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email","password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" }
        }
      }
    }
  },
  paths: {
    "/api/health": {
      get: { summary: "Health check", responses: { "200": { description: "OK" } } }
    },
    "/api/health/db": {
      get: { summary: "DB connectivity check", responses: { "200": { description: "OK" }, "500": { description: "DB error" } } }
    },
    "/api/auth/signup": {
      post: {
        summary: "Create account",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/SignupRequest" } } }
        },
        responses: { "201": { description: "Created" }, "409": { description: "Email exists" } }
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Login",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } }
        },
        responses: { "200": { description: "OK" }, "401": { description: "Invalid credentials" } }
      }
    },
    "/api/users": {
      get: {
        summary: "List users",
        parameters: [{ name: "limit", in: "query", schema: { type: "integer", default: 100 } }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } }
      },
      post: {
        summary: "Create user",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
        responses: { "201": { description: "Created" }, "409": { description: "Email exists" } }
      }
    },
    "/api/users/{id}": {
      get: {
        summary: "Get user by id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, "404": { description: "Not found" } }
      },
      patch: {
        summary: "Update user",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
      },
      delete: {
        summary: "Delete user",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not found" } }
      }
    },
    "/api/users/mentors": {
      get: {
        summary: "List mentors",
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } }
      }
    },
    "/api/users/mentors/{id}": {
      get: {
        summary: "Get mentor by id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
      }
    },
    "/api/users/mentees": {
      get: {
        summary: "List mentees",
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } }
      }
    }
  }
};

function mountSwagger(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));
}

module.exports = { mountSwagger };
