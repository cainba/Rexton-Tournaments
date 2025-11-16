import eslint from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import tseslint from "typescript-eslint"

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        ignores: [
            "**/dist/**",
            "**/node_modules/**",
            "**/types/**",
            "**/*.config.js",
            "**/*.tsbuildinfo",
            "scripts/**"
        ]
    },
    {
        plugins: {
            "@stylistic": stylistic
        },
        languageOptions: {
            parserOptions: {
                project: true,
                ecmaVersion: 2024,
                sourceType: "module"
            }
        },
        rules: {
            // Type Safety Enhancement Rules
            // These rules help catch common type-related issues early
            "@typescript-eslint/strict-boolean-expressions": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/await-thenable": "error",

            // Code Clarity Rules
            // These rules promote more readable and maintainable code
            "@typescript-eslint/explicit-function-return-type": ["error", {
                allowExpressions: true,
                allowTypedFunctionExpressions: true
            }],
            "@typescript-eslint/explicit-member-accessibility": ["error", {
                accessibility: "explicit"
            }],
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "interface",
                    "format": ["PascalCase"],
                    "prefix": ["I"]
                },
                {
                    "selector": "typeAlias",
                    "format": ["PascalCase"]
                },
                {
                    "selector": "variable",
                    "format": ["camelCase", "UPPER_CASE"],
                    "leadingUnderscore": "allow"
                }
            ],

            // Modern JavaScript Best Practices
            // These rules encourage using modern JavaScript features effectively
            "@typescript-eslint/prefer-optional-chain": "error",
            "@typescript-eslint/prefer-nullish-coalescing": "error",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "@typescript-eslint/prefer-readonly": "error",

            // Error Prevention Rules
            // These rules help catch common mistakes
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/only-throw-error": "error",
            "@typescript-eslint/no-unnecessary-type-arguments": "error",
            "@typescript-eslint/prefer-includes": "error",

            // Stylistic Rules
            // These rules ensure consistent code formatting
            "@stylistic/semi": ["error", "never"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/comma-dangle": ["error", "never"],
            "@stylistic/brace-style": ["error", "1tbs"],
            "@stylistic/arrow-parens": ["error", "always"],
            "@stylistic/max-len": ["error", {
                code: 100,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreComments: true
            }],

            // Code Organization Rules
            // These rules help maintain a consistent project structure
            "@typescript-eslint/member-ordering": ["error", {
                default: [
                    "public-static-field",
                    "protected-static-field",
                    "private-static-field",
                    "public-instance-field",
                    "protected-instance-field",
                    "private-instance-field",
                    "constructor",
                    "public-method",
                    "protected-method",
                    "private-method"
                ]
            }],
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/prefer-namespace-keyword": "error",

            // Performance Consideration Rules
            // These rules help prevent performance issues
            "@typescript-eslint/no-unnecessary-type-constraint": "error",
            "@typescript-eslint/prefer-regexp-exec": "error",
            "@typescript-eslint/prefer-string-starts-ends-with": "error"
        }
    }
)