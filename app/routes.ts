import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("htb", "./routes/htb/layout.tsx", [
    index("./routes/htb/index.tsx"),
    route(":writeup", "./routes/htb/writeup.tsx"),
  ]),
] satisfies RouteConfig;
