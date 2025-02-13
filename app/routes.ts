import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("htb/:writeup", "./routes/writeup.tsx"),
] satisfies RouteConfig;
