'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.userSchema = void 0;
var zod_1 = require('zod');
var userRoleSchema = zod_1.default.enum(['user', 'admin', 'creator']);
exports.userSchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    phoneNumber: zod_1.default.string(),
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    role: userRoleSchema,
    creationDate: zod_1.default.date(),
});
