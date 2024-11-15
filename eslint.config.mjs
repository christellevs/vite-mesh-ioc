import { sharedConfigs } from '@nodescript/eslint-config';

const configs = [
    ...sharedConfigs,
    // Ignore import sorting in generated index.ts files
    {
        files: ['**/src/main/index.ts'],
        rules: {
            'simple-import-sort/exports': 'off'
        }
    },
];

export default configs;
