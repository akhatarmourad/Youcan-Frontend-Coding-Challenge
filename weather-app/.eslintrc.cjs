module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
        'prettier',
        'plugin:storybook/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
        ignorePatterns: ['.eslintrc.cjs']
    },
    plugins: [
        'no-relative-import-paths',
        'vue',
        '@typescript-eslint',
        'prettier',
        'unused-imports'
    ],
    rules: {
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': ['error']
    }
}
