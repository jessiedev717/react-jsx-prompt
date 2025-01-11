# Structured Prompt

React JSX for AI Prompts

This repository demonstrates how to use React JSX syntax to compose AI prompts in a structured and maintainable way. It leverages built-in JSX templating for complex workflows, including:

- Component-based structure: Organizes prompts into reusable components (e.g., Character, Goals, Memories) for better modularity.
- Context API: Enables data sharing and state management within the prompt hierarchy using React's Context API.
- Asynchronous operations: Handles asynchronous tasks (e.g., API calls) seamlessly within the prompt rendering process.
- Markdown elements: Defines custom JSX elements (e.g., h1, p, ul) to map directly to common Markdown or prompt formatting.

```tsx
import { render } from "react-jsx-prompt";

const SystemPrompt = () => (
  <p>You are a helpful ai agent.</p>
);

const ExamplePrompt = async (trigger: Trigger) => {
  return (
    <AgentProvider id={trigger.agentId}>
      <CharacterProvider id={trigger.agentId}>
        <Character/>
        <Goals/>
        <Facts/>
        <Capabilities/>
        <MessageHistory/>
        {
          trigger.type === "user"
            ? <UserMessage params={trigger.message}>
            : <AgentMessage params={trigger.message}>
        }
      </CharacterProvider>
    </AgentProvider>
  )
}

const [system, prompt] = await Promise.all([
  render(<SystemPrompt/>),
  render(<ExamplePrompt/>)
]);

const { text } = await generateText({
  model: openai('gpt-4o'),
  system,
  prompt,
});
```

### Key Features

- Clear and concise: The JSX syntax provides a readable and intuitive way to define prompts.
- Data flow management: Utilize the Context API to share data between components within the prompt structure.
- Asynchronous support: Handle asynchronous operations like API calls or delays within the prompt rendering process.
- Ability to support more sophisticated components, such as <img/> to embed / transcribe image content.

### Inspiration

- [anysphere/priompt](https://github.com/anysphere/priompt)
- [fables.gg](https://fables.gg/blog/introducing-jsx-prompts-build-complex-prompts-for-llms-with-jsx)
