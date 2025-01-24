import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./server/production.ts"],
  format: "esm",
  outfile: "./build/serve.js",
  platform: "node",
});
