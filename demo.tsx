import React from "react";
import { createContext } from "react";
import { render, useContext } from "./src/renderer";

const XProvider = createContext(0);
const useX = () => useContext(XProvider);

const Prompt = async () => {
  await sleep(300);

  return (
    <>
      <Intro />
      <Goals />
    </>
  );
};

const Test = async ({ v }: { v: number }) => {
  return (
    <XProvider value={v}>
      <TestInner />
    </XProvider>
  );
};

const TestInner = async () => {
  const x = useX();
  await sleep(Math.random() * 100);
  await sleep(Math.random() * 100);
  return <li>{x}</li>;
};

const Intro = async () => {
  const x = useX();
  const date = await getDate();

  return (
    <>
      <h1>Lets write something interesting {x}</h1>
      <h2>And see how it goes. ({date})</h2>
      <p>
        Which will show the code of the caller function. Sadly, that is not
        enough for me, and that is why I give you tips for the StackTrace and
        the caller function Name (although they are not cross-browser).
      </p>
      <Test v={1} />
      <Test v={2} />
      <Test v={3} />
      <Test v={4} />
      <Test v={5} />
    </>
  );
};

const Goals = () => (
  <>
    <h3>Goals</h3>
    <ul>
      <li>First Item</li>
      <li>Second Item</li>
      <li>Third Item</li>
      <li>Forth Item</li>
    </ul>
  </>
);

const App = () => (
  <XProvider value={2}>
    <Prompt />
  </XProvider>
);

render(<App />).then(console.log);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getDate = async () => {
  await sleep(300);
  return new Date().toLocaleString("en-US");
};
