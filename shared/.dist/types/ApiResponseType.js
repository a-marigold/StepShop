"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseSchema = void 0;
var zod_1 = require("zod");
exports.ApiResponseSchema = zod_1.default.object({
    statusCode: zod_1.default.number(),
    message: zod_1.default.string(),
});
