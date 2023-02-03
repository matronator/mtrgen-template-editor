import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { compareChanges, generateUUID, isNumeric } from "../../utils/utils";
import { Constant, Visibility } from "../../Schema";
import { CollapsedNode } from "../CollapsedNode";
import { Node } from "../Node";
import { IndexedStringNode } from "./IndexedStringNode";
import { getValueByType } from "./MethodNode";

interface ConstNodeProps {
    constant: Constant;
    onClose?: () => void;
    onConstChange?: (constant: Constant|undefined) => void;
}

export function ConstNode(props: ConstNodeProps) {
    const [constant, setConstant] = useState<Constant>({
        id: props.constant?.id ?? generateUUID(),
        name: props.constant?.name ?? '',
        value: props.constant?.value ?? '',
        visibility: props.constant?.visibility ?? Visibility.Public,
        comments: props.constant?.comments ?? [],
    });

    useEffect(() => {
        props.onConstChange?.(constant);
    }, [constant]);

    function handleChangeComment(id: number|string, newValue: string) {
        setConstant({
            ...constant,
            comments: constant?.comments?.map((value) => compareChanges(value, id, newValue, true))
        });
    }

    function handleRemoveComment(id: number|string) {
        setConstant({
            ...constant,
            comments: constant?.comments?.filter((value, key) => value.id !== id)
        });
    }

    function handleAddComment() {
        setConstant({
            ...constant,
            comments: constant?.comments?.concat([{id: generateUUID(), value: ''}]) ?? [{id: generateUUID(), value: ''}],
        });
    }

    return (
        <CollapsedNode eventKey="const" header="Constant" name={renderConst(constant)} onCloseClick={props.onClose} closeButton>
            <Node title="name" value={constant.name} onChange={(e) => setConstant({...constant, name: e.target.value})} />
            <Node title="value" onChange={(e) => setConstant({...constant, value: e.target.value})} />
            <Node.Enum title="visibility" value="Public" name="visibility" options={Object.keys(Visibility)} onChange={(e) => setConstant({...constant, visibility: e.target.value as Visibility})} />
            <IndexedStringNode strings={constant.comments} onAdd={handleAddComment} onChange={handleChangeComment} onRemove={handleRemoveComment} />
        </CollapsedNode>
    );
}

function renderConst(value: Constant) {
    return (
        <>
            {value.visibility ? value.visibility.toLowerCase() + ' ' : ''}const {value.name}{value.value ? <>&nbsp;<span className="syntax-operator">=</span>&nbsp;{getValueByType(['true', 'false', 'null'].includes(value.value.toString()) ? 'bool' : (isNumeric(value.value) ? 'int' : 'string'), value.value)}</> : ''}
        </>
    );
}
