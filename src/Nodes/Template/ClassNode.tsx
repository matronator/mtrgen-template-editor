import { useEffect, useState } from 'react';
import { Class, Constant, IndexedString, Method, Modifier, Prop } from '../../Schema';
import { compareChanges, generateUUID } from '../../utils/utils';
import { CollapsedNode } from '../CollapsedNode';
import { Node } from '../Node';
import { ConstNode } from './ConstNode';
import { IndexedStringNode } from './IndexedStringNode';
import { MethodNode } from './MethodNode';
import { PropNode } from './PropNode';

interface ClassNodeProps {
    class?: Class;
    onClose?: () => void;
    onClassChange?: (cls: Class|undefined) => void;
}

type IndexedStringClassType = "implements" | "comments" | "traits";
type ClassItemTypeName = "methods" | "constants" | "props";
type ClassItemType = Method | Constant | Prop;

export function ClassNode(props: ClassNodeProps) {
    const [cls, setCls] = useState<Class|undefined>(props.class);

    useEffect(() => {
        props.onClassChange?.(cls);
    }, [cls]);

    function handleAddIndexedString(name: IndexedStringClassType) {
        setCls(prevValue => ({
            ...prevValue,
            [name]: ((prevValue?.[name] ?? []) as IndexedString[]).concat([{id: generateUUID(), value: ''}]) ?? [{id: generateUUID(), value: ''}],
        }));
    }

    function handleChangeIndexedString(name: IndexedStringClassType, id: string | number, newValue: string) {
        setCls(prevValue => ({
            ...prevValue,
            [name]: ((prevValue?.[name] ?? []) as IndexedString[]).map((value) => compareChanges(value, id, newValue, true)) ?? [],
        }));
    }

    function handleRemoveIndexedString(name: IndexedStringClassType, id: string | number) {
        setCls(prevValue => ({
            ...prevValue,
            [name]: ((prevValue?.[name] ?? []) as IndexedString[]).filter((value, key) => value.id !== id) ?? [],
        }));
    }

    function handleAddItem(name: ClassItemTypeName, itemName: string) {
        setCls(prevValue => ({
            ...prevValue,
            [name]: (prevValue?.[name] as Required<{id: string, name: string}>[])?.concat([{id: generateUUID(), name: itemName}]) ?? [{id: generateUUID(), name: itemName}],
        }));
    }

    function handleRemoveItem(name: ClassItemTypeName, id: number|string) {
        setCls(prevValue => ({
            ...prevValue,
            name: prevValue?.name ?? '',
            [name]: (prevValue?.[name] as Required<{id: string, name: string}>[])?.filter((value, key) => value.id !== id) ?? [],
        }));
    }

    function handleChangeItem(name: ClassItemTypeName, id: number|string, value: ClassItemType|undefined) {
        setCls(prevValue => ({
            ...prevValue,
            name: prevValue?.name ?? '',
            [name]: (prevValue?.[name] as Required<{id: string, name: string}>[])?.map((val) => compareChanges(val, id, value)) ?? [],
        }));
    }

    return (
        <CollapsedNode eventKey="class" header="Class" name={getClassHeader(cls)} onCloseClick={props.onClose} closeButton>
            <Node title="name" value={cls?.name ?? '_class'} onChange={(e) => setCls(prevVal => ({ ...prevVal, name: e.target.value }))} />
            <Node.Enum name="modifier" title="modifier" options={['', 'final', 'abstract']} onChange={(e) => setCls(prevValue => ({ ...prevValue, modifier: e.target.value as Modifier }))} />
            <Node title="extends" onChange={(e) => setCls(prevVal => ({ ...prevVal, extends: e.target.value }))} />
            <IndexedStringNode title="implements" addButtonTitle="Add implement" strings={cls?.implements} onAdd={() => handleAddIndexedString('implements')} onChange={(id, newValue) => handleChangeIndexedString('implements', id, newValue)} onRemove={(id) => handleRemoveIndexedString('implements', id)} />
            <IndexedStringNode strings={cls?.comments} onAdd={() => handleAddIndexedString('comments')} onChange={(id, newValue) => handleChangeIndexedString('comments', id, newValue)} onRemove={(id) => handleRemoveIndexedString('comments', id)} />
            <IndexedStringNode title="traits" addButtonTitle="Add trait" strings={cls?.traits} onAdd={() => handleAddIndexedString('traits')} onChange={(id, newValue) => handleChangeIndexedString('traits', id, newValue)} onRemove={(id) => handleRemoveIndexedString('traits', id)} />
            <Node.Array title="methods" onAdd={() => handleAddItem('methods', 'method')} titleSpan={2} valueSpan={10} addButtonTitle="Add method">
                {cls?.methods?.map((item, key) =>
                    <MethodNode key={item.id} id={item.id} method={item} onClose={() => handleRemoveItem('methods', item.id)} onMethodChange={(method) => handleChangeItem('methods', item.id, method)} />
                )}
            </Node.Array>
            <Node.Array title="constants" onAdd={() => handleAddItem('constants', 'CONSTANT')} titleSpan={2} valueSpan={10} addButtonTitle="Add constant">
                {cls?.constants?.map((item, key) =>
                    <ConstNode key={item.id} constant={item} onClose={() => handleRemoveItem('constants', item.id)} onConstChange={(constant) => handleChangeItem('constants', item.id, constant)} />
                )}
            </Node.Array>
            <Node.Array title="properties" onAdd={() => handleAddItem('props', 'prop')} titleSpan={2} valueSpan={10} addButtonTitle="Add property">
                {cls?.props?.map((item, key) =>
                    <PropNode key={item.id} id={item.id} prop={item} onClose={() => handleRemoveItem('props', item.id)} onPropChange={(prop) => handleChangeItem('props', item.id, prop)} />
                )}
            </Node.Array>
        </CollapsedNode>
    );

    function getClassHeader(item: Class|undefined) {
        return (
            <>
                {item?.modifier ? `${item?.modifier} ` : ''}class <span className="syntax-operator">{item?.name ?? '_class'}</span>
                {item?.extends && <> extends <span className="syntax-extends">{item.extends}</span></>}
                {item?.implements && <> implements <span className="syntax-class">{item.implements.map(({ value }, index) => <>{item.implements!.length - 1 > index ? <>{value}<span key={index} className="syntax-operator">, </span></> : value}</>)}</span></>}
            </>
        );
    }
}
