const { responses } = require("../../utils/responses/swagger");
const { options } = require("../../constants/swagger");

options.tags = ["Purpose"];

module.exports = {
  "/pulse/": {
    get: {
      ...options,
      description: "Get Pulse",
      responses: responses({
        token: {
          type: "string",
        },
        completed: {
          type: "boolean",
        },
      }),
    },
    put: {
      ...options,
      description: "Update Field",
      responses: {
        200: { description: "ok" },
      },
      parameters: [
        {
          in: "body",
          name: "field",
          required: true,
          type: "string",
          example: "name",
        },
        {
          in: "body",
          name: "step",
          required: true,
          type: "string",
          enum: ["score, DNA", "emotionalIntl", "pulse", "completed"],
        },
        {
          in: "body",
          name: "value",
          required: true,
          type: ["string", "integer"],
          example: 1,
        },
      ],
    },
    post: {
      ...options,
      description: "Create Purpose",
      responses: {
        200: { description: "ok" },
      },
      parameters: [
        {
          in: "body",
          name: "completed",
          required: true,
          type: "boolean",
        },
        {
          in: "body",
          name: "score",
          required: true,
          type: "object",
          properties: scoreResponse,
        },
        {
          in: "body",
          name: "DNA",
          required: true,
          type: "object",
          properties: DNAResponse,
        },
        {
          in: "body",
          name: "emotionalIntl",
          required: true,
          type: "object",
          properties: emotionalIntl,
        },
      ],
    },
  },
};
