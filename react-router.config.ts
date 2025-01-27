import { readdir } from "fs/promises";
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,

  async prerender() {
    const directories = await readdir("content/htb");

    return directories.map((dir) => {
      return `/htb/${dir}`;
    });
  },
} satisfies Config;
