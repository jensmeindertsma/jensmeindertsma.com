import type { Route } from "./+types/writeup";

export default function Writeup({
  loaderData: { title },
}: Route.ComponentProps) {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}

export async function loader() {
  return { title: "x" };
}
