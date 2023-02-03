import { ChangeEvent, Fragment, MouseEvent, ReactNode, useState } from "react";
import { Button } from "react-bootstrap";

interface NodeProps {
    title: string;
    type?: string;
    value?: string;
    titleClass?: string;
    valueClass?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Node(props: NodeProps) {
    const [value, setValue] = useState(props.value ?? '');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        if (props.onChange instanceof Function) {
            props.onChange(e);
        }
    }

    return (
        <div className="node-item">
            <div className={`${props.titleClass ?? ''} span-6 text-left`}>
                {props.title}:
            </div>
            <div className={`${props.valueClass ?? ''} span-6`}>
                <input type={props.type ?? 'text'} value={props.value ?? value} onChange={handleChange} />
            </div>
        </div>
    );
}

interface TextAreaNodeProps {
    title: string;
    type?: string;
    titleClass?: string;
    valueClass?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaNode(props: TextAreaNodeProps) {
    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
        if (props.onChange instanceof Function) {
            props.onChange(e);
        }
    }

    return (
        <div className="node-item textarea-node">
            <div className={`${props.titleClass ?? ''} span-6 text-left`}>
                {props.title}:
            </div>
            <div className={`${props.valueClass ?? ''} span-6`}>
                <textarea value={value} onChange={handleChange} rows={4}></textarea>
            </div>
        </div>
    );
}

interface ArrayNodeProps {
    title: string;
    onAdd?: (e: MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
    titleSpan?: number;
    valueSpan?: number;
    addButtonTitle?: string;
}

function ArrayNode(props: ArrayNodeProps) {
    return (
        <div className="node-item">
            <div className={`span-${props.titleSpan ?? 6} text-left`}>
                {props.title}:
            </div>
            <div className={`span-${props.valueSpan ?? 6}`}>
                {props.children}
                <Button variant="primary" size="sm" onClick={props.onAdd}>{props.addButtonTitle ?? 'Add'}</Button>
            </div>
        </div>
    );
}

interface ObjectNodeProps {
    title: string;
    titleClass?: string;
    children?: ReactNode;
}

function ObjectNode(props: ObjectNodeProps) {
    return (
        <div className="node-item">
            <div className={`${props.titleClass ?? ''} span-6 text-left`}>
                {props.title}:
            </div>
            <div className="span-6 grid">
                {props.children}
            </div>
        </div>
    );
}

interface EnumNodeProps {
    options: string[];
    title: string;
    name: string;
    value?: string;
    titleClass?: string;
    valueClass?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function EnumNode(props: EnumNodeProps) {
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        if (props.onChange instanceof Function) {
            props.onChange(e);
        }
    }

    return (
        <div className="node-item">
            <div className={`${props.titleClass ?? ''} span-6 text-left`}>
                {props.title}:
            </div>
            <div className={`${props.valueClass ?? ''} span-6`}>
                <select name={props.name} id={props.name} onChange={handleChange}>
                    {props.options.map(option => 
                        <Fragment key={option}>
                            {option.toString() === props.value ? <option selected={true}>{option}</option> : <option key={option}>{option}</option>}
                        </Fragment>
                    )}
                </select>
            </div>
        </div>
    );
}

Node.Object = ObjectNode;
Node.Array = ArrayNode;
Node.Enum = EnumNode;
Node.TextArea = TextAreaNode;

export { Node };
