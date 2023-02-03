import { MouseEvent, useEffect, useState } from "react";
import { compareChanges, generateUUID } from "../../utils/utils";
import { Prop, Visibility } from "../../Schema";
import { CollapsedNode } from "../CollapsedNode";
import { Node } from "../Node";
import { IndexedStringNode } from "./IndexedStringNode";
import { getValueByType, renderType } from "./MethodNode";

interface PropNodeProps {
    id: number | string;
    prop: Prop;
    onClose?: () => void;
    onPropChange?: (prop: Prop|undefined) => void;
}

export function PropNode(props: PropNodeProps) {
    const [prop, setProp] = useState<Prop>({
        id: props.prop.id ?? generateUUID(),
        comments: props.prop.comments ?? [],
        getter: props.prop.getter ?? false,
        setter: props.prop.setter ?? false,
        name: props.prop.name ?? 'Prop',
        init: props.prop.init ?? false,
        type: props.prop.type ?? undefined,
        nullable: props.prop.nullable ?? false,
        static: props.prop.static ?? false,
        visibility: props.prop.visibility ?? Visibility.Public,
        value: props.prop.value ?? undefined,
    });

    useEffect(() => {
        props.onPropChange?.(prop);
    }, [prop]);

    function handleAddComment(e: MouseEvent<HTMLButtonElement>) {
        setProp(prevProp => ({
            ...prevProp,
            comments: [...(prevProp.comments ?? []), { id: generateUUID(), value: '' }]
        }));
    }

    function handleRemoveComment(id: number | string) {
        setProp(prevProp => ({
            ...prevProp,
            comments: prevProp.comments?.filter((value, key) => value.id !== id)
        }));
    }

    function handleChangeComment(id: number | string, newValue: string) {
        setProp(prevProp => ({
            ...prevProp,
            comments: prevProp.comments?.map((value) => compareChanges(value, id, newValue, true)),
        }));
    }

    return (
        <CollapsedNode eventKey="property" header="Property" name={renderProp(prop)} onCloseClick={props.onClose} closeButton>
            <Node title="name" value={prop.name} onChange={(e) => setProp(prevProp => ({ ...prevProp, name: e.target.value }))} />
            <Node.Enum title="visibility" value="Public" name="visibility" options={[Visibility.Public, Visibility.Protected, Visibility.Private]} onChange={(e) => setProp(prevProp => ({...prevProp, visibility: e.target.value as Visibility}))} />
            <Node type="checkbox" title="static" onChange={(e) => setProp(prevProp => ({ ...prevProp, static: e.target.checked }))} />
            <Node title="type" value={prop.type} onChange={(e) => setProp(prevProp => ({ ...prevProp, type: e.target.value }))} />
            <Node type="checkbox" title="nullable" onChange={(e) => setProp(prevProp => ({ ...prevProp, nullable: e.target.checked }))} />
            <Node title="value" onChange={(e) => setProp(prevProp => ({ ...prevProp, value: e.target.value, init: e.target.value !== '' }))} />
            <Node type="checkbox" title="getter" onChange={(e) => setProp(prevProp => ({ ...prevProp, getter: e.target.checked }))} />
            <Node type="checkbox" title="setter" onChange={(e) => setProp(prevProp => ({ ...prevProp, setter: e.target.checked }))} />
            <IndexedStringNode strings={prop.comments} onAdd={handleAddComment} onChange={handleChangeComment} onRemove={handleRemoveComment} />
        </CollapsedNode>
    );
}

function renderProp(value: Prop) {
    return (
        <>
            {value.visibility}{value.static ? ' static' : ''} {value.nullable ? <span className="syntax-operator">?</span> : ''}{value.type ? renderType(value.type) : ''}<span className="syntax-operator">${value.name}</span>{value.value ? <>&nbsp;<span className="syntax-operator">=</span>&nbsp;{getValueByType(value.type ?? 'string', value.value)}</> : ''}
        </>
    );
}
