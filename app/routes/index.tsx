import { Link } from "react-router";
import type { Route } from "./+types/index";

export default function Home({
  loaderData: { writeups },
}: Route.ComponentProps) {
  return (
    <>
      <h1>Jens Meindertsma</h1>
      <p>Welcome to my website!</p>

      <h2>HackTheBox</h2>
      <ul>
        {writeups.map(({ title, url }) => (
          <li key={url}>
            <Link to={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  return { writeups: [{ title: "Teacher", url: "/htb/teacher" }] };
}
