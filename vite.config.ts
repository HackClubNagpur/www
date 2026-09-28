import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {execSync} from 'node:child_process';
import path from 'path';
import {defineConfig} from 'vite';

// Short commit hash baked into the site footer. Prefers git metadata
// (present locally and on Vercel, which clones the repo), then env.
function commitSha(): string {
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return '';
  }
}

const COMMIT_SHA =
  commitSha() ||
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
  process.env.VITE_COMMIT_SHA ||
  '';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    define: {
      __COMMIT_SHA__: JSON.stringify(COMMIT_SHA),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
