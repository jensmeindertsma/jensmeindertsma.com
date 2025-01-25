import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(() => {
  return {
    plugins: [
      reactRouter(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: "content/htb/*/images/*",
            dest: "htb",
            rename: (_filename, _extension, fullPath) => {
              const match = fullPath.match(
                /content\/htb\/([^/]+)\/images\/([^/]+)/,
              );

              if (match) {
                const [, folderName, imageName] = match;
                return `${folderName}/${imageName}`;
              }

              throw new Error(
                "Failed to copy images to build folder, incorrect structure detected",
              );
            },
          },
        ],
      }),
    ],
  };
});
