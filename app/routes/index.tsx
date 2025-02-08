import { readdir, readFile } from "fs/promises";
import { Link } from "react-router";
import Markdoc from "@markdoc/markdoc";
import yaml from "yaml";
import type { Route } from "./+types/index";

export function meta() {
  return [{ title: "Home" }];
}

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
  const directories = await readdir("content/htb");

  return {
    writeups: await Promise.all(
      directories.map(async (dir) => {
        const file = await readFile(`content/htb/${dir}/${dir}.md`);
        const content = file.toString();

        const ast = Markdoc.parse(content);
        const frontmatter = ast.attributes.frontmatter
          ? yaml.parse(ast.attributes.frontmatter)
          : {};
        const { title } = frontmatter;

        return { title, url: `/htb/${dir}` };
      }),
    ),
  };
}
