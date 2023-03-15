import { ReactNode, useState } from 'react';
import { Accordion, CloseButton, useAccordionButton } from 'react-bootstrap';

interface CollapsedNodeProps {
    eventKey: string;
    header?: string;
    name?: ReactNode;
    children?: ReactNode;
    closeButton?: boolean;
    onCloseClick?: () => void;
}

interface AccordionToggleProps {
    children?: ReactNode;
    eventKey: string;
}

function AccordionToggle(props: AccordionToggleProps) {
    const [collapsed, setCollapsed] = useState(false);

    const decoratedOnClick = useAccordionButton(props.eventKey, () => {
        setCollapsed(prevValue => !prevValue);
    });

    return (
        <span onClick={decoratedOnClick} className={`accordion-button ${collapsed ? 'collapsed' : ''}`} style={{ cursor: 'pointer' }}>
            {props.children || ''}
        </span>
    );
}

export function CollapsedNode(props: CollapsedNodeProps) {
    return (
        <Accordion defaultActiveKey={props.eventKey} className="accordion-node">
            <Accordion.Item eventKey={props.eventKey}>
                <h2 className='accordion-header'>
                    <AccordionToggle eventKey={props.eventKey}>
                        {props.closeButton && <CloseButton onClick={() => props.onCloseClick && props.onCloseClick()} />}
                        {props.header ?? ''}{props.name && <>{props.header ? <>:&nbsp;</> : ''}<pre className="item-name"><code>{props.name}</code></pre></>}
                    </AccordionToggle>
                </h2>
                <Accordion.Body>
                    {props.children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
