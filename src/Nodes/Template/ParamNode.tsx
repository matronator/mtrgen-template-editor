import { useEffect, useState } from "react";
import { generateUUID } from "../../utils/utils";
import { Param } from "../../Schema";
import { CollapsedNode } from "../CollapsedNode";
import { Node } from "../Node";
import { renderParam } from "./MethodNode";

interface ParamNodeProps {
    id: number|string;
    param?: Param;
    onClose?: () => void;
    onChange?: (param: Param|undefined) => void;
}

export function ParamNode(props: ParamNodeProps) {
    const [param, setParam] = useState<Param>({
        id: props.param?.id ?? generateUUID(),
        name: props.param?.name ?? 'Param',
        type: props.param?.type,
        nullable: props.param?.nullable,
        ref: props.param?.ref,
        promoted: props.param?.promoted,
        value: props.param?.value,
    });

    useEffect(() => {
        props.onChange?.(param);
    }, [param]);

    return (
        <CollapsedNode eventKey={`param-${param.id}`} header="Param" name={renderParam(param)} closeButton onCloseClick={props.onClose}>
            <Node title="name" value={param.name} onChange={(e) => setParam(prevParam => ({...prevParam, name: e.target.value})) } />
            <Node title="type" value={param.type} onChange={(e) => setParam(prevParam => ({...prevParam, type: e.target.value})) } />
            <Node title="nullable" type="checkbox" onChange={(e) => setParam(prevParam => ({...prevParam, nullable: e.target.checked})) } />
            <Node title="reference" type="checkbox" onChange={(e) => setParam(prevParam => ({...prevParam, ref: e.target.checked})) } />
            <Node title="value" value={param.value?.toString()} onChange={(e) => setParam(prevParam => ({...prevParam, value: e.target.value})) } />
            <Node title="promoted" type="checkbox" onChange={(e) => setParam(prevParam => ({...prevParam, promoted: e.target.checked})) } />
        </CollapsedNode>
    );
}
