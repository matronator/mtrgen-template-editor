import { ReactNode } from "react";
import { Accordion, CloseButton } from "react-bootstrap";

interface CollapsedNodeProps {
    eventKey: string;
    header?: string;
    name?: ReactNode;
    children?: ReactNode;
    closeButton?: boolean;
    onCloseClick?: () => void;
}

export function CollapsedNode(props: CollapsedNodeProps) {
    return (
        <Accordion defaultActiveKey={props.eventKey} className="accordion-node">
            <Accordion.Item eventKey={props.eventKey}>
                <Accordion.Header>
                    {props.closeButton && <CloseButton onClick={() => props.onCloseClick && props.onCloseClick()} />}
                    {props.header ?? ''}{props.name && <>{props.header ? <>:&nbsp;</> : ''}<pre className="item-name"><code>{props.name}</code></pre></>}
                </Accordion.Header>
                <Accordion.Body>
                    {props.children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
