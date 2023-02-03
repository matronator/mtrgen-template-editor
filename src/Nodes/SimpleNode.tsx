import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";

interface SimpleNodeProps {
    title: string;
    titleClass?: string;
    valueClass?: string;
}

export function SimpleNode(props: SimpleNodeProps) {
    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return (
        <>
            <div className={`${props.titleClass ?? ''} span-6`}>
                {props.title}:
            </div>
            <div className={`${props.valueClass ?? ''} span-6`}>
                <Form.Control type="text" value={value} onChange={handleChange} />
            </div>
        </>
    );
}