import build from '@hono/vite-build/cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import adapter from '@hono/vite-dev-server/cloudflare';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
   if (mode === 'client') {
      return {
         esbuild: {
            jsxImportSource: 'hono/jsx/dom',
         },
         build: {
            rollupOptions: {
               input: ['./src/client.tsx', './src/index.css'],
               output: {
                  entryFileNames: 'static/client.js',
                  assetFileNames: 'static/[name].[ext]',
               },
            },
         },
      };
   } else {
      return {
         plugins: [
            build({
               entry: 'src/index.tsx',
            }),
            devServer({
               adapter,
               entry: 'src/index.tsx',
            }),
         ],
      };
   }
});
