import { readdir, readFile } from "fs/promises";
import { Link } from "react-router";
import Markdoc from "@markdoc/markdoc";
import yaml from "yaml";
import stylesheet from "~/styles/index.css?url";
import type { Route } from "./+types/index";

export function meta() {
  return [{ title: "Home" }];
}

export function links(): Route.LinkDescriptors {
  return [
    {
      rel: "stylesheet",
      href: stylesheet,
    },
  ];
}

export default function Home({
  loaderData: { writeups },
}: Route.ComponentProps) {
  return (
    <>
      <h1>Jens Meindertsma</h1>
      <img src="/profile.jpg" />

      <h2>Certifications</h2>
      <section>
        <div className="itvitae">
          <img src="/itvitae-light.png" className="light" />
          <img src="/itvitae-dark.png" className="dark" />
          <p>Certified Cyber Security Specialist</p>
        </div>

        <div className="northwave">
          <img src="/northwave-light.png" className="light" />
          <img src="/northwave-dark.png" className="dark" />
          <p>TODO title</p>
        </div>
      </section>

      <section className="comptia">
        <img
          src="/comptia-linux+.svg"
          className="linux"
          aria-label="I am CompTIA Linux+ certified"
        />
        <div className="casp">
          <img
            src="/comptia-casp+.svg"
            aria-label="My CompTIA CASP+ certification is still in progress"
          />

          <span>🚧 SOON</span>
        </div>
      </section>

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
