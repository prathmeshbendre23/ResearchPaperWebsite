import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function inquiryApiDevPlugin() {
  return {
    name: 'inquiry-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        if (url.pathname !== '/api/inquiry') {
          return next();
        }

        req.on('error', (err) => {
          console.error('[vite-dev-api] Request stream error:', err);
          if (!res.headersSent) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Invalid request stream.' }));
          }
        });

        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', async () => {
          const rawBody = Buffer.concat(chunks).toString('utf8');
          req.body = rawBody;

          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            if (!res.headersSent) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
            res.end(JSON.stringify(data));
            return res;
          };

          try {
            const { default: handler } = await import('./api/inquiry.js');
            await handler(req, res);
          } catch (err) {
            console.error('[vite-dev-api] Error processing /api/inquiry:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Local dev server error.' }));
            }
          }
        });
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, val] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }

  return {
    plugins: [react(), inquiryApiDevPlugin()],
    server: {
      port: 3000,
      open: false,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'three-core': ['three'],
            'three-fiber': ['@react-three/fiber'],
            'framer-motion': ['framer-motion'],
            'lucide': ['lucide-react'],
          }
        }
      }
    }
  };
})
