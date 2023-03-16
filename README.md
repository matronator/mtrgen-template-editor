<p align="center">
  <a href="https://github.com/matronator/mtrgen-template-editor" rel="noopener">
    <img width=200px height=200px src="https://github.com/matronator/mtrgen-template-editor/blob/main/.github/icon.png?raw=true" alt="Project logo">
  </a>
</p>

<h1 align="center">MTRGen Template Editor</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/matronator/mtrgen-template-editor.svg)](https://github.com/matronator/mtrgen-template-editor/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/matronator/mtrgen-template-editor.svg)](https://github.com/matronator/mtrgen-template-editor/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">

  Template editor for [MTRGen](https://github.com/matronator/mtrgen) as a React component.
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
    - [With NPM or PNPM](#with-npm-or-pnpm)
    - [With Yarn](#with-yarn)
    - [With Bun](#with-bun)
- [🎈 Usage ](#-usage-)
  - [Interfaces](#interfaces)
    - [`EditorProps`](#editorprops)
    - [Template Schema Interfaces](#template-schema-interfaces)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)
- [🎧 Dev Soundtrack ](#-dev-soundtrack-)

## 🧐 About <a name = "about"></a>

React component for editing JSON templates to be used by [MTRGen](https://github.com/matronator/mtrgen).

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

You need to have NodeJS installed and use React in your project.

### Installing

#### With NPM or PNPM

```
npm install mtrgen-template-editor
```
```
pnpm install mtrgen-template-editor
```

#### With Yarn

```
yarn add mtrgen-template-editor
```

#### With Bun
```
bun add mtrgen-template-editor
```

## 🎈 Usage <a name="usage"></a>

```jsx
// Import the component
import { MTRGenTemplateEditor, Template } from "mtrgen-template-editor";

function App() {
    // Create a template object
    const [template, setTemplate] = useState<Template>({
        name: "Template",
        path: "path",
        filename: "template",
        file: {}
    });

    return (
        <div className="App">
            {/* Use it */}
            <MTRGenTemplateEditor setTemplate={setTemplate} template={template} onTemplateChange={(temp) => setTemplate(temp) } />
        </div>
    );
}
```

### Interfaces

#### `EditorProps`
```ts
interface EditorProps {
    template: Template; // The template object
    onTemplateChange: (template: Template) => void; // Callback for when the template changes
    setTemplate: Dispatch<SetStateAction<Template>>; // React hook for setting the template
}
```

#### Template Schema Interfaces
```ts
interface Template {
    autoImport?: boolean;
    file:        File;
    filename:    string;
    name:        string;
    path:        string;
}

interface File {
    class?:     Class;
    interface?: Interface;
    namespace?: Namespace;
    strict?:    boolean;
    trait?:     Trait;
    use?:       IndexedString[];
}

interface Class {
    comments?:   IndexedString[];
    constants?:  Constant[];
    extends?:    string;
    implements?: IndexedString[];
    methods?:    Method[];
    modifier?:   Modifier;
    name:        string;
    props?:      Prop[];
    traits?:     IndexedString[];
}

interface Constant {
    id:          number|string;
    comments?:   IndexedString[];
    name:        string;
    value:       Value;
    visibility?: Visibility;
}

type Value = any[] | boolean | number | number | { [key: string]: any } | null | string;

interface Method {
    id:          number|string;
    body?:       IndexedString[];
    comments?:   IndexedString[];
    modifier?:   Modifier;
    name:        string;
    nullable?:   boolean;
    params?:     Param[];
    ref?:        boolean;
    return?:     string;
    static?:     boolean;
    visibility?: Visibility;
}

enum Modifier {
    Abstract = "abstract",
    Final = "final",
}

interface Param {
    id:        number|string;
    name:      string;
    nullable?: boolean;
    promoted?: boolean;
    ref?:      boolean;
    type?:     string;
    value?:    Value;
}

enum Visibility {
    Private = "private",
    Protected = "protected",
    Public = "public",
}

interface Prop {
    id:          number|string;
    comments?:   IndexedString[];
    getter?:     boolean;
    init?:       boolean;
    name:        string;
    nullable?:   boolean;
    setter?:     boolean;
    static?:     boolean;
    type?:       string;
    value?:      Value;
    visibility?: Visibility;
}

interface Interface {
    comments?:  IndexedString[];
    constants?: Constant[];
    extends?:   string;
    methods?:   Method[];
    name:       string;
}

interface Namespace {
    class?:     Class;
    interface?: Interface;
    name:       string;
    trait?:     Trait;
    use?:       IndexedString[];
}

interface Trait {
    comments?: IndexedString[];
    methods?:  Method[];
    name:      string;
    props?:    Prop[];
}

interface IndexedString {
    id: number|string;
    value: string;
}
```

## ⛏️ Built Using <a name = "built_using"></a>

- [pnpm](https://pnpm.io) - pnpm
- [TypeScript](https://www.typescriptlang.org) - TypeScript
- [React](https://reactjs.org) - React
- [Bootstrap](https://getbootstrap.com) - Bootstrap
- [React Bootstrap](https://react-bootstrap.github.io) - React Bootstrap

## ✍️ Authors <a name = "authors"></a>

- [@matronator](https://github.com/matronator) - Everything

## 🎧 Dev Soundtrack <a name = "dev-soundtrack"></a>

Package was built while listening to:

- [Bring Me The Horizon - There Is a Hell Believe Me I've Seen It. There Is a Heaven Let's Keep It a Secret.](https://www.youtube.com/watch?v=BpkDrTLk9K0)
- [Suicide Silence - The Cleansing](https://www.youtube.com/watch?v=msM_4uznjAg)
- [Blackout Podcast 75 - Black Sun Empire](https://soundcloud.com/blackoutmusicnl/blackout-podcast-75-black-sun-empire)
- [Neonlight - 2 Hours #10YNL Special @ Fat Bemme x Boundless Beatz (11 - 10 - 2019)](https://soundcloud.com/neonlightmusic/10years-neonlight-2hours-special-fatbemme-11-10-2019)
