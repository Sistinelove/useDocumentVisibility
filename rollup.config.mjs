import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/customHook/useDocumentVisibility.tsx',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
        resolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        terser()
    ],
    external: ['react', 'react-dom'],
};
