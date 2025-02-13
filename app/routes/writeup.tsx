import Markdoc from "@markdoc/markdoc";
import yaml from "yaml";
import { data, isRouteErrorResponse, useRouteError } from "react-router";
import React from "react";
import { getContent, isContentAvailable } from "~/utilities/content.server";
import type { Route } from "./+types/writeup";

export default function Writeup({
  loaderData: { title, difficulty, os, content },
}: Route.ComponentProps) {
  return (
    <>
      <h1>{title}</h1>
      <ul>
        <li>Difficulty: {difficulty}</li>
        <li>OS: {os}</li>
      </ul>
      {Markdoc.renderers.react(content, React)}
    </>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const contentAvailable = await isContentAvailable();

  if (!contentAvailable) {
    throw data("Cannot render new pages in production!", { status: 404 });
  }

  const content = await getContent("htb", params.writeup);

  if (!content) {
    throw data("Write-up not found!", { status: 404 });
  }

  const ast = Markdoc.parse(content);

  const frontmatter = ast.attributes.frontmatter
    ? yaml.parse(ast.attributes.frontmatter)
    : {};

  return {
    title: frontmatter.title,
    difficulty: frontmatter.difficulty,
    os: frontmatter.os,
    content: Markdoc.transform(ast, {
      nodes: {
        document: { ...Markdoc.nodes.document, render: "main" },
        image: {
          transform(node, config) {
            let src = node.attributes.src;

            src = node.attributes.src.replace(
              /\.\/images/,
              `/htb/${params.writeup}`,
            );

            const attributes = node.transformAttributes(config);
            return new Markdoc.Tag("img", {
              ...attributes,
              src,
            });
          },
        },
      },
    }),
  };
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
