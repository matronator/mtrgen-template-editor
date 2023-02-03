import { useState } from "react";
import { Form } from "react-bootstrap";

interface ControlledInputProps {
    value: string;
}

export function ControlledInput(props: ControlledInputProps) {
    const [value, setValue] = useState(props.value);

    return (
        <>
            <Form.Control type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </>
    );
}
