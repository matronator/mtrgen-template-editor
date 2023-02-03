import React, { MouseEvent, ReactNode, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { compareChanges, generateUUID } from "../../utils/utils";
import { Method, Modifier, Param, Visibility } from "../../Schema";
import { CollapsedNode } from "../CollapsedNode";
import { Node } from "../Node";
import { IndexedStringNode } from "./IndexedStringNode";
import { ParamNode } from "./ParamNode";

interface MethodNodeProps {
    id: number | string;
    method?: Method;
    onClose?: () => void;
    onMethodChange?: (method: Method | undefined) => void;
}

export function MethodNode(props: MethodNodeProps) {
    const [method, setMethod] = useState<Method>({
        id: props.method?.id ?? generateUUID(),
        name: props.method?.name ?? 'Method',
        nullable: props.method?.nullable,
        ref: props.method?.ref,
        static: props.method?.static,
        visibility: props.method?.visibility ?? Visibility.Public,
        modifier: props.method?.modifier,
        return: props.method?.return,
        comments: props.method?.comments,
        body: props.method?.body,
        params: props.method?.params,
    });

    useEffect(() => {
        props.onMethodChange?.(method);
    }, [method]);

    function handleAddComment(e: MouseEvent<HTMLButtonElement>) {
        setMethod({
            ...method,
            comments: [...(method.comments ?? []), { id: generateUUID(), value: '' }]
        });
    }

    function handleRemoveComment(id: number | string) {
        setMethod({
            ...method,
            comments: method.comments?.filter((value, key) => value.id !== id)
        });
    }

    function handleChangeComment(id: number | string, newValue: string) {
        setMethod({
            ...method,
            comments: method.comments?.map((value) => compareChanges(value, id, newValue, true)) ?? []
        });
    }

    function handleChangeModifier(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === '') {
            setMethod({
                ...method,
                modifier: undefined
            });
        } else {
            setMethod({
                ...method,
                modifier: e.target.value as Modifier
            });
        }
    }

    function handleChangeBody(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const lines = e.target.value.split('\n');
        setMethod({
            ...method,
            body: lines.map(value => { return { id: generateUUID(), value: value } })
        });
    }

    function handleAddParam(e: MouseEvent<HTMLButtonElement>) {
        setMethod(prevMethod => ({
            ...prevMethod,
            params: [...(prevMethod.params ?? []), { id: generateUUID(), name: 'param', type: 'string' }],
        }));
    }

    function handleRemoveParam(id: number | string) {
        setMethod(prevMethod => ({
            ...prevMethod,
            params: prevMethod.params?.filter((value, key) => value.id !== id)
        }));
    }

    function handleChangeParam(id: number | string, newValue: Param | undefined) {
        setMethod(prevMethod => ({
            ...prevMethod,
            params: prevMethod.params?.map((value) => compareChanges(value, id, newValue))
        }));
    }

    return (
        <CollapsedNode eventKey={`method-${props.id}`} name={getMethodSignature(method)} onCloseClick={props.onClose} closeButton>
            <Node title="name" value={method.name} onChange={(e) => setMethod({ ...method, name: e.target.value })} />
            <Node.Enum name="modifier" title="modifier" options={['', 'final', 'abstract']} onChange={handleChangeModifier} />
            <Node.Enum name="visibility" title="visibility" options={[Visibility.Public, Visibility.Protected, Visibility.Private]} onChange={(e) => setMethod({ ...method, visibility: e.target.value as Visibility })} />
            <Node title="return type" onChange={(e) => setMethod({ ...method, return: e.target.value })} />
            <Node title="static" type="checkbox" onChange={(e) => setMethod({ ...method, static: e.target.checked })} />
            <Node title="return nullable" type="checkbox" onChange={(e) => setMethod({ ...method, nullable: e.target.checked })} />
            <Node title="return by ref" type="checkbox" onChange={(e) => setMethod({ ...method, ref: e.target.checked })} />
            <IndexedStringNode strings={method.comments} onAdd={handleAddComment} onChange={handleChangeComment} onRemove={handleRemoveComment} />
            <Node.TextArea title="body" onChange={handleChangeBody}></Node.TextArea>
            <Node.Array title="params" onAdd={handleAddParam} titleSpan={2} valueSpan={10} addButtonTitle="Add parameter">
                {method.params?.map((item, key) =>
                    <ParamNode key={item.id} id={item.id} param={item} onClose={() => handleRemoveParam(item.id)} onChange={(param) => handleChangeParam(item.id, param)} />
                )}
            </Node.Array>
        </CollapsedNode>
    );
}

function getMethodSignature(method: Method): ReactNode {
    return <>
        {method.modifier ? `${method.modifier} ` : ''}{method.visibility ? `${method.visibility} ` : ''}{method.static ? 'static ' : ''}function&nbsp;{method.ref ? '&' : ''}<span className="syntax-function">{method.name}</span>
        <span className="syntax-operator">(</span>{method.params?.map((value, index) =>
            <React.Fragment key={index}>
                {renderParam(value)}
                {index < method.params!.length - 1 ? <span className="syntax-operator">, </span> : ''}
            </React.Fragment>
        )}<span className="syntax-operator">)</span>{method.return ? <><span className="syntax-operator">:</span>&nbsp;{method.nullable ? <span className="syntax-operator">?</span> : ''}{renderType(method.return)}</> : ''}
    </>;
}

export function getValueByType(type: string, value: any): ReactNode {
    switch (type) {
        case 'string':
            return <span className="syntax-string">"{value}"</span>;
        case 'int':
        case 'float':
            return <span className="syntax-number">{value}</span>;
        case 'bool':
            return <span className="syntax-boolean">{value.toString()}</span>;
        default:
            return <span className="syntax-unknown">{value.toString()}</span>;
    }
}

export function renderParam(value: Param) {
    return (
        <>
            {value.promoted ? <span className="syntax-class">public </span> : ''}{value.nullable ? <span className="syntax-operator">?</span> : ''}{value.type ? renderType(value.type) : ''}{value.ref ? '&' : ''}<span className="syntax-operator">${value.name}</span>{value.value ? <>&nbsp;<span className="syntax-operator">=</span>&nbsp;{getValueByType(value.type ?? 'string', value.value)}</> : ''}
        </>
    );
}

export function renderType(type: string): ReactNode {
    if (['bool', 'int', 'float', 'string', 'array', 'object', 'callable'].includes(type)) {
        return <span className="syntax-type">{type} </span>;
    } else {
        return <span className="syntax-class">{type} </span>;
    }
}
