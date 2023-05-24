import { V2_MetaFunction } from "@remix-run/cloudflare";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function Home() {
  return <h1>Welcome to my place!</h1>;
}
