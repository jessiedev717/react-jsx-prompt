import React from "react";

export const Br = () => <>{"\n"}</>;

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <>
      #{children}
      <Br />
      <Br />
    </>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <>
      ##{children}
      <Br />
      <Br />
    </>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <>
      ###{children}
      <Br />
      <Br />
    </>
  );
}

export function H4({ children }: { children: React.ReactNode }) {
  return (
    <>
      ####{children}
      <Br />
      <Br />
    </>
  );
}

export function H5({ children }: { children: React.ReactNode }) {
  return (
    <>
      #####{children}
      <Br />
      <Br />
    </>
  );
}

export function H6({ children }: { children: React.ReactNode }) {
  return (
    <>
      ######{children}
      <Br />
      <Br />
    </>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Br />
      <Br />
    </>
  );
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Br />
      <Br />
    </>
  );
}

export function Ol({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Br />
      <Br />
    </>
  );
}

export function Li({ children }: { children: React.ReactNode }) {
  return (
    <>
      - {children}
      <Br />
    </>
  );
}

export function A({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {"["}
      {children}
      {"]("}
      {href}
      {")"}
    </>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <>**{children}**</>;
}

export function Em({ children }: { children: React.ReactNode }) {
  return <>*{children}*</>;
}

export function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <>
      {">"}
      {children}
      <Br />
      <Br />
    </>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return <>`{children}`</>;
}

export function Pre({ children }: { children: React.ReactNode }) {
  return (
    <>
      ```{children}```
      <Br />
      <Br />
    </>
  );
}

export const elements = new Map([
  ["h1", H1],
  ["h2", H2],
  ["h3", H3],
  ["h4", H4],
  ["h5", H5],
  ["h6", H6],

  ["p", P],
  ["ul", Ul],
  ["ol", Ol],
  ["li", Li],

  ["a", A],
  ["strong", Strong],
  ["em", Em],
  ["br", Br],

  ["blockquote", Blockquote],
  ["code", Code],
  ["pre", Pre],
]);
