import { useState } from "react";
import { PrismLight } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import darcula from 'react-syntax-highlighter/dist/esm/styles/prism/darcula';
import { Button, Modal } from "react-bootstrap";
import { Convert, Template } from "../Schema";

interface OutputModalProps {
    show: boolean;
    onHide?: () => void;
    template: Template;
}

export function OutputModal(props: OutputModalProps) {
    const [ show, setShow ] = useState(props.show);
    PrismLight.registerLanguage('json', json);

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>Export to JSON</Button>

            <Modal show={show} onHide={() => setShow(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Export to JSON</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrismLight language={json} style={darcula} showLineNumbers={true} customStyle={{maxHeight: 400}}>
                        {Convert.templateToJson(props.template)}
                    </PrismLight>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
