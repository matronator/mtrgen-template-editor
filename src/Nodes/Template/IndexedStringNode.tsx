import { MouseEvent } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { IndexedString } from "../../Schema";
import { Node } from "../Node";

interface IndexedStringProps {
    strings: IndexedString[] | undefined;
    title?: string;
    addButtonTitle?: string;
    onAdd: (e: MouseEvent<HTMLButtonElement>) => void;
    onChange: (id: number | string, newValue: string) => void;
    onRemove: (id: number | string) => void;
}

export function IndexedStringNode(props: IndexedStringProps) {
    return (
        <Node.Array title={props.title ?? 'comments'} onAdd={props.onAdd} addButtonTitle={props.addButtonTitle ?? 'Add comment'}>
            {props.strings?.map((item, key) => <InputGroup key={item.id}>
                <Form.Control type="text" onChange={e => props.onChange(item.id, e.target.value)} />
                <InputGroup.Text as={Button} className="btn-danger" onClick={() => props.onRemove(item.id)}><i className="fa fa-trash"></i></InputGroup.Text>
            </InputGroup>)}
        </Node.Array>
    );
}
