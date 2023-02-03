# MTRGen Template Editor

Template editor for MTRGen as a React component.

## Installation

### NPM, PNPM

```
npm install mtrgen-template-editor
pnpm install mtrgen-template-editor
```

### Yarn

```
yarn add mtrgen-template-editor
```

### Bun
```
bun add mtrgen-template-editor
```

## Usage

```tsx
// Import the component
import { MTRGenTemplateEditor } from "mtrgen-template-editor";

function App() {
    return (
        <div className="App">
            <!-- Use it -->
            <MTRGenTemplateEditor />
        </div>
    );
}
```

## Props

### `onTemplateChange` (optional)

```ts
onTemplateChange?: (template: Template) => void;
```

`template` - the changed template object
