import React from "react";
import { Context, isValidElement, ReactNode } from "react";
import { elements } from "./elements";

type Node = ReactNode;

export { createContext } from "react";

let contexts: any[] = [];

export const useContext = function <T>(ctx: Context<T>) {
  return contexts.find((c) => c.type === ctx)?.props?.value as T;
};

const ReactFragment = Symbol.for("react.fragment") as any;
const ReactContext = Symbol.for("react.context") as any;

const isPrimitive = (node: Node) =>
  typeof node === "string" ||
  typeof node === "number" ||
  typeof node === "boolean";

const isFragment = (node: Node) =>
  isValidElement(node) && node.type === ReactFragment;

const isContext = (node: Node) =>
  isValidElement(node) && (node.type as any).$$typeof === ReactContext;

const isHtml = (node: Node) =>
  isValidElement(node) &&
  typeof node.type === "string" &&
  elements.has(node.type);

const isComponent = (node: Node) =>
  isValidElement(node) && typeof node.type === "function";

const inferNodeType = (node: Node) => {
  if (node === undefined) return "empty";
  if (node === null) return "empty";
  if (isPrimitive(node)) return "primitive";
  if (Array.isArray(node)) return "array";
  if (isFragment(node)) return "fragment";
  if (isContext(node)) return "context";
  if (isHtml(node)) return "html";
  if (isComponent(node)) return "component";
  return "unknown";
};

const getChildren = (node: any) => node?.props.children as Node;

export async function render(node: Node, ctx: any[] = []) {
  const renderWithContext = async (
    n: Node,
    newContext?: any
  ): Promise<string | undefined> => {
    let prev = contexts;
    contexts = newContext ? [newContext].concat(ctx) : ctx;
    const out = await render(n, contexts);
    contexts = prev;
    return out;
  };

  switch (inferNodeType(node)) {
    case "array":
      return Promise.all((node as Node[]).map(renderWithContext)).then((res) =>
        res.join("")
      );
    case "primitive":
      return node?.toString();
    case "fragment":
      return renderWithContext(getChildren(node));
    case "context":
      return renderWithContext(getChildren(node), node);
    case "html": {
      const type = (node as any).type as string;
      const element = elements.get(type) ?? (elements.get("p") as Function);
      const props = [(node as any).props];
      const children = await element(...props);
      return renderWithContext(children);
    }
    case "component": {
      const component = (node as any).type as Function;
      const props = [(node as any).props];
      const children = await component(...props);
      return renderWithContext(children);
    }
    case "empty": {
      return "";
    }
    default: {
      throw new Error("unknown node");
    }
  }
}
