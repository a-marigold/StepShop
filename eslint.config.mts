import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginNext from '@next/eslint-plugin-next';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { js },
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            pluginReact.configs.flat.recommended,
            'next/core-web-vitals',
        ],

        languageOptions: { globals: globals.browser },

        rules: {
            'react/react-in-jsx-scope': 'off',
        },

        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended'],
    },
]);
