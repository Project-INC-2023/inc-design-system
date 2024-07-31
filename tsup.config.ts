import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts", "src/components/**/*.tsx"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
});
