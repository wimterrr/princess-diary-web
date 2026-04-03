import { defineConfig } from "vite";

export default defineConfig({
  // Use relative asset paths so the build works on GitHub Pages subpaths
  // like /<repo-name>/ without special env-based configuration.
  base: "./",
});
