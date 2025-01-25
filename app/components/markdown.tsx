import Markdoc from "@markdoc/markdoc";
import * as React from "react";
import type { RenderableTreeNodes } from "@markdoc/markdoc";

type Props = { content: RenderableTreeNodes };

export function Markdown({ content }: Props) {
  return <>{Markdoc.renderers.react(content, React)}</>;
}
