// To parse this data:
//
//   import { Convert, Template } from "./file";
//
//   const template = Convert.toTemplate(json);

import { compareArrays } from "./utils/utils";

/**
 * Schema for YAML/JSON templates for MTRGen PHP file generator.
 *
 * Define the name of the template, filename of the generated file and path where the file
 * should be generated
 */
 export interface Template {
    autoImport?: boolean;
    file:        File;
    filename:    string;
    name:        string;
    path:        string;
}

/**
 * Root level of the file containing the namespace, classes, use statements, etc
 */
export interface File {
    class?:     Class;
    interface?: Interface;
    namespace?: Namespace;
    strict?:    boolean;
    trait?:     Trait;
    use?:       IndexedString[];
}

export interface Class {
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

export interface Constant {
    id:          number|string;
    comments?:   IndexedString[];
    name:        string;
    value:       Value;
    visibility?: Visibility;
}

export type Value = any[] | boolean | number | number | { [key: string]: any } | null | string;

export interface Method {
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

export enum Modifier {
    Abstract = "abstract",
    Final = "final",
}

export interface Param {
    id:        number|string;
    name:      string;
    nullable?: boolean;
    promoted?: boolean;
    ref?:      boolean;
    type?:     string;
    value?:    Value;
}

export enum Visibility {
    Private = "private",
    Protected = "protected",
    Public = "public",
}

export interface Prop {
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

export interface Interface {
    comments?:  IndexedString[];
    constants?: Constant[];
    extends?:   string;
    methods?:   Method[];
    name:       string;
}

export interface Namespace {
    class?:     Class;
    interface?: Interface;
    name:       string;
    trait?:     Trait;
    use?:       IndexedString[];
}

export interface Trait {
    comments?: IndexedString[];
    methods?:  Method[];
    name:      string;
    props?:    Prop[];
}

export interface IndexedString {
    id: number|string;
    value: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toTemplate(json: string): Template {
        return JSON.parse(json);
    }

    public static templateToJson(value: Template): string {
        return JSON.stringify(value, (key, value) => {
            if (key === 'id') {
                return undefined;
            }
            if (value instanceof Object && compareArrays(Object.keys(value), ['id', 'value'])) {
                return value.value;
            }
            return value;
        }, 2);
    }

    public static toFile(json: string): File {
        return JSON.parse(json);
    }

    public static fileToJson(value: File): string {
        return JSON.stringify(value);
    }

    public static toClass(json: string): Class {
        return JSON.parse(json);
    }

    public static classToJson(value: Class): string {
        return JSON.stringify(value);
    }

    public static toConstant(json: string): Constant {
        return JSON.parse(json);
    }

    public static constantToJson(value: Constant): string {
        return JSON.stringify(value);
    }

    public static toMethod(json: string): Method {
        return JSON.parse(json);
    }

    public static methodToJson(value: Method): string {
        return JSON.stringify(value);
    }

    public static toParam(json: string): Param {
        return JSON.parse(json);
    }

    public static paramToJson(value: Param): string {
        return JSON.stringify(value);
    }

    public static toProp(json: string): Prop {
        return JSON.parse(json);
    }

    public static propToJson(value: Prop): string {
        return JSON.stringify(value);
    }

    public static toInterface(json: string): Interface {
        return JSON.parse(json);
    }

    public static interfaceToJson(value: Interface): string {
        return JSON.stringify(value);
    }

    public static toNamespace(json: string): Namespace {
        return JSON.parse(json);
    }

    public static namespaceToJson(value: Namespace): string {
        return JSON.stringify(value);
    }

    public static toTrait(json: string): Trait {
        return JSON.parse(json);
    }

    public static traitToJson(value: Trait): string {
        return JSON.stringify(value);
    }

    public static indexedToString(indexedString: IndexedString): string {
        return indexedString.value;
    }
}
