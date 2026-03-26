export const hikedocs = {
  "openapi": "3.0.3",
  "info": {
    "title": "Hikes API",
    "version": "1.0.0"
  },
  "paths": {
    "/": {
      "get": {
        "summary": "Return a test message",
        "description": "Simple test return to see if a connection was made.",
        "responses": {
          "200": {
            "description": "Successful connection",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "Hello, World"
                }
              }
            }
          }
        }
      }
    },
    "/hikes": {
      "get": {
        "summary": "Returns a list of hikes",
        "description": "Does an SQL search for the hike database",
        "responses": {
          "200": {
            "description": "Successful return",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": { "type": "integer" },
                      "name": { "type": "string" },
                      "description": { "type": "string" },
                      "location": { "type": "string" },
                      "createdAt": { "type": "string", "format": "date-time" },
                      "updatedAt": { "type": "string", "format": "date-time" },
                      "authorId": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/hikes/{id}": {
      "get": {
        "summary": "Returns the specified hike.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "200": {
            "description": "Returned the specified hike",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "type": "string" }
                }
              }
            }
          }
        }
      }
    },
    "/protected/hikes": {
      "post": {
        "summary": "Add a new hike",
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "type": "string" }
                }
              }
            }
          }
        }
      }
    },
    "/protected/hikes/{id}": {
      "delete": {
        "summary": "Remove the specified hike",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "200": { "description": "Deleted" },
          "403": { "description": "Unauthorized" }
        }
      }
    },
    "/protected/my-favorites": {
      "delete": {
        "summary": "Remove the specified hike",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "200": { "description": "Deleted" },
          "403": { "description": "Unauthorized" }
        }
      }
    }
  }
} as const;