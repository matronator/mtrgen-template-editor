import { useEffect, useState } from 'react';
import { Constant, Interface, Method } from '../../Schema';
import { compareChanges, generateUUID } from '../../utils/utils';
import { CollapsedNode } from '../CollapsedNode';
import { Node } from '../Node';
import { ConstNode } from './ConstNode';
import { IndexedStringNode } from './IndexedStringNode';
import { MethodNode } from './MethodNode';

interface InterfaceNodeProps {
    interface?: Interface;
    onClose?: () => void;
    onInterfaceChange?: (item: Interface|undefined) => void;
}

export function InterfaceNode(props: InterfaceNodeProps) {
    const [inter, setInter] = useState<Interface|undefined>(props.interface);

    useEffect(() => {
        props.onInterfaceChange?.(inter);
    }, [inter]);

    function handleChangeComment(id: number|string, newValue: string) {
        setInter({
            ...inter,
            name: inter?.name ?? '',
            comments: inter?.comments?.map((value) => compareChanges(value, id, newValue, true)) ?? [],
        });
    }

    function handleRemoveComment(id: number|string) {
        setInter({
            ...inter,
            name: inter?.name ?? '',
            comments: inter?.comments?.filter((value, key) => value.id !== id) ?? [],
        });
    }

    function handleAddComment() {
        setInter({
            ...inter,
            name: inter?.name ?? '',
            comments: inter?.comments?.concat([{id: generateUUID(), value: ''}]) ?? [{id: generateUUID(), value: ''}],
        });
    }

    function handleAddMethod() {
        setInter(prevInter => ({
            ...prevInter,
            name: prevInter?.name ?? '',
            methods: prevInter?.methods?.concat([{id: generateUUID(), name: 'Method'}]) ?? [{id: generateUUID(), name: 'Method'}],
        }));
    }

    function handleRemoveMethod(id: number|string) {
        setInter(prevInter => ({
            ...prevInter,
            name: prevInter?.name ?? '',
            methods: prevInter?.methods?.filter((value, key) => value.id !== id) ?? [],
        }));
    }

    function handleChangeMethod(id: number|string, method: Method|undefined) {
        setInter(prevInter => ({
            ...prevInter,
            name: prevInter?.name ?? '',
            methods: prevInter?.methods?.map((value) => compareChanges(value, id, method)) ?? [],
        }));
    }

    function handleAddConst() {
        setInter(prevInter => ({
            ...prevInter,
            name: prevInter?.name ?? '',
            constants: prevInter?.constants?.concat([{id: generateUUID(), name: 'Constant', value: '0'}]) ?? [{id: generateUUID(), name: 'Constant', value: '0'}],
        }));
    }

    function handleRemoveConst(id: number|string) {
        setInter(prevInter => ({
            ...prevInter,
            name: prevInter?.name ?? '',
            constants: prevInter?.constants?.filter((value, key) => value.id !== id) ?? [],
        }));
    }

    function handleChangeConst(id: number|string, constant: Constant|undefined) {
        setInter(prevInter => ({
            ...prevInter,
            name: prevInter?.name ?? '',
            constants: prevInter?.constants?.map((value) => compareChanges(value, id, constant)) ?? [],
        }));
    }

    return (
        <CollapsedNode eventKey="interface" header="Interface" name={getInterfaceHeader(inter)} onCloseClick={props.onClose} closeButton>
            <Node title="name" value={inter?.name ?? '_interface'} onChange={(e) => setInter(prevVal => ({...prevVal, name: e.target.value}))} />
            <Node title="extends" value={inter?.extends} onChange={(e) => setInter(prevVal => ({...prevVal, extends: e.target.value}))} />
            <IndexedStringNode strings={inter?.comments} onAdd={handleAddComment} onChange={handleChangeComment} onRemove={handleRemoveComment} />
            <Node.Array title="constants" onAdd={handleAddConst} titleSpan={2} valueSpan={10} addButtonTitle="Add constant">
                {inter?.constants?.map((item, key) =>
                    <ConstNode key={item.id} constant={item} onClose={() => handleRemoveConst(item.id)} onConstChange={(constant) => handleChangeConst(item.id, constant)} />
                )}
            </Node.Array>
            <Node.Array title="methods" onAdd={handleAddMethod} titleSpan={2} valueSpan={10} addButtonTitle="Add method">
                {inter?.methods?.map((item, key) =>
                    <MethodNode key={item.id} id={item.id} method={item} onClose={() => handleRemoveMethod(item.id)} onMethodChange={(method) => handleChangeMethod(item.id, method)} />
                )}
            </Node.Array>
        </CollapsedNode>
    );

    function getInterfaceHeader(inter: Interface|undefined) {
        return (
            <>
                interface <span className="syntax-operator">{inter?.name ?? '_interface'}</span>
                {inter?.extends && <> extends <span className="syntax-extends">{inter.extends}</span></>}
            </>
        );
    }
}
