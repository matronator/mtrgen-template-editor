import { MouseEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { compareChanges, generateUUID } from "../../utils/utils";
import { Trait, Method, Prop } from "../../Schema";
import { CollapsedNode } from "../CollapsedNode";
import { Node } from "../Node";
import { IndexedStringNode } from "./IndexedStringNode";
import { MethodNode } from "./MethodNode";
import { PropNode } from "./PropNode";

interface TraitNodeProps {
    trait?: Trait;
    onClose?: () => void;
    onTraitChange?: (trait: Trait|undefined) => void;
}

export function TraitNode(props: TraitNodeProps) {
    const [trait, setTrait] = useState<Trait|undefined>(props.trait);

    useEffect(() => {
        props.onTraitChange?.(trait);
    }, [trait]);
    
    function handleAddComment(e: MouseEvent<HTMLButtonElement>) {
        setTrait({
            ...trait,
            name: trait?.name ?? '',
            comments: trait?.comments?.concat([{id: generateUUID(), value: ''}]) ?? [{id: generateUUID(), value: ''}],
        });
    }
    
    function handleRemoveComment(id: number|string) {
        setTrait({
            ...trait,
            name: trait?.name ?? '',
            comments: trait?.comments?.filter((value, key) => value.id !== id) ?? [],
        });
    }
    
    function handleAddMethod(e: MouseEvent<HTMLButtonElement>) {
        setTrait(prevTrait => ({
            ...prevTrait,
            name: prevTrait?.name ?? '',
            methods: prevTrait?.methods?.concat([{id: generateUUID(), name: 'Method'}]) ?? [{id: generateUUID(), name: 'Method'}],
        }));
    }

    function handleRemoveMethod(id: number|string) {
        setTrait(prevTrait => ({
            ...prevTrait,
            name: prevTrait?.name ?? '',
            methods: prevTrait?.methods?.filter((value, key) => value.id !== id) ?? [],
        }));
    }

    function handleChangeComment(id: number|string, newValue: string) {
        setTrait({
            ...trait,
            name: trait?.name ?? '',
            comments: trait?.comments?.map((value) => compareChanges(value, id, newValue, true)) ?? [],
        });
    }

    function handleChangeMethod(id: number|string, newValue: Method|undefined) {
        setTrait(prevTrait => ({
            ...prevTrait,
            name: prevTrait?.name ?? '',
            methods: prevTrait?.methods?.map((value) => compareChanges(value, id, newValue)) ?? [],
        }));
    }

    function handleAddProp(e: MouseEvent<HTMLButtonElement>) {
        setTrait(prevTrait => ({
            ...prevTrait,
            name: prevTrait?.name ?? '',
            props: prevTrait?.props?.concat([{id: generateUUID(), name: 'prop'}]) ?? [{id: generateUUID(), name: 'prop'}],
        }));
    }

    function handleRemoveProp(id: number|string) {
        setTrait(prevTrait => ({
            ...prevTrait,
            name: prevTrait?.name ?? '',
            props: prevTrait?.props?.filter((value, key) => value.id !== id) ?? [],
        }));
    }

    function handleChangeProp(id: number|string, newValue: Method|undefined) {
        setTrait(prevTrait => ({
            ...prevTrait,
            name: prevTrait?.name ?? '',
            props: prevTrait?.props?.map((value) => compareChanges(value, id, newValue)) ?? [],
        }));
    }

    return (
        <CollapsedNode eventKey="trait" header="Trait" name={trait?.name} onCloseClick={props.onClose} closeButton>
            <Node title="name" value={trait?.name ?? 'Trait'} onChange={(e) => setTrait({...trait, name: e.target.value})} />
            <IndexedStringNode strings={trait?.comments} onAdd={handleAddComment} onChange={handleChangeComment} onRemove={handleRemoveComment} />
            <Node.Array title="methods" onAdd={handleAddMethod} titleSpan={2} valueSpan={10} addButtonTitle="Add method">
                {trait?.methods?.map((item, key) =>
                    <MethodNode key={item.id} id={item.id} method={item} onClose={() => handleRemoveMethod(item.id)} onMethodChange={(method) => handleChangeMethod(item.id, method)} />
                )}
            </Node.Array>
            <Node.Array title="properties" onAdd={handleAddProp} titleSpan={2} valueSpan={10} addButtonTitle="Add property">
                {trait?.props?.map((item, key) =>
                    <PropNode key={item.id} id={item.id} prop={item} onClose={() => handleRemoveProp(item.id)} onPropChange={(prop) => handleChangeProp(item.id, prop)} />
                )}
            </Node.Array>
        </CollapsedNode>
    );
}
