import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins: any[] = [react()];

  // Only load Cloudflare and Mocha plugins outside of Vercel builds
  if (!process.env.VERCEL) {
    const { mochaPlugins } = await import("@getmocha/vite-plugins");
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins.unshift(...mochaPlugins(process.env as any));
    plugins.push(
      cloudflare({
        auxiliaryWorkers: [{ configPath: "/mocha/emails-service/wrangler.json" }],
      })
    );
  }

  return {
    plugins,
    server: {
      allowedHosts: true,
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
