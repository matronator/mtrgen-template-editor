import './styles/App.css';
import './styles/Editor.css';
import './styles/grid.css';
import './styles/utils.css';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Accordion, Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { useEffectOnce } from 'usehooks-ts';
import { CollapsedNode } from './Nodes/CollapsedNode';
import { Node } from './Nodes/Node';
import { ClassNode } from './Nodes/Template/ClassNode';
import { InterfaceNode } from './Nodes/Template/InterfaceNode';
import { TraitNode } from './Nodes/Template/TraitNode';
import { Interface, Template, Trait } from './Schema';
import { generateUUID, injectStyles, setNodeHeader } from './utils/utils';

interface EditorProps {
    template: Template;
    onTemplateChange: (template: Template) => void;
    setTemplate: Dispatch<SetStateAction<Template>>;
}

export function Editor(props: EditorProps) {
    const [styles, setStyles] = useState<boolean>(false);

    useEffectOnce(() => {
        if (!styles) {
            injectStyles();
            setStyles(true);
        }
    });

    useEffect(() => {
        props.onTemplateChange(props.template);
    }, [props.template]);

    function fileIsEmpty() {
        return !props.template.file.class && !props.template.file.interface && !props.template.file.namespace && !props.template.file.trait;
    }

    function namespaceIsEmpty() {
        return !props.template.file.namespace || (!props.template.file.namespace.class && !props.template.file.namespace.interface && !props.template.file.namespace.trait);
    }

    function handleChangeTrait(trait: Trait | undefined, namespaced = false) {
        if (namespaced) {
            props.setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    namespace: {
                        ...prevTemplate.file.namespace,
                        name: prevTemplate.file.namespace?.name ?? '_namespace',
                        trait
                    }
                }
            }));
        } else {
            props.setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    trait
                }
            }));
        }
    }

    function handleChangeInterface(inter: Interface | undefined, namespaced = false) {
        if (namespaced) {
            props.setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    namespace: {
                        ...prevTemplate.file.namespace,
                        name: prevTemplate.file.namespace?.name ?? '_namespace',
                        interface: inter,
                    }
                }
            }));
        } else {
            props.setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    interface: inter,
                }
            }));
        }
    }

    function handleChangeClass(classNode: Interface | undefined, namespaced = false) {
        if (namespaced) {
            props.setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    namespace: {
                        ...prevTemplate.file.namespace,
                        name: prevTemplate.file.namespace?.name ?? '_namespace',
                        class: classNode,
                    }
                }
            }));
        } else {
            props.setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    class: classNode,
                }
            }));
        }
    }

    function handleAddFileUse() {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                use: props.template.file.use?.concat([{ id: generateUUID(), value: '' }]) ?? [{ id: generateUUID(), value: '' }]
            }
        }));
    }

    function handleChangeFileUse(id: number | string, newValue: string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                use: props.template.file.use?.map((value) => {
                    if (value.id === id) {
                        return {
                            id: value.id,
                            value: newValue,
                        };
                    }
                    return value;
                }
                )
            }
        }));
    }

    function handleRemoveFileUse(id: number | string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                use: props.template.file.use?.filter((value) => value.id !== id)
            }
        }));
    }

    function handleAddNamespaceUse() {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                namespace: {
                    ...props.template.file.namespace,
                    name: props.template.file.namespace?.name ?? '_namespace',
                    use: props.template.file.namespace?.use?.concat([{ id: generateUUID(), value: '' }]) ?? [{ id: generateUUID(), value: '' }]
                }
            }
        }));
    }

    function handleChangeNamespaceUse(id: number | string, newValue: string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                namespace: {
                    ...props.template.file.namespace,
                    name: props.template.file.namespace?.name ?? '_namespace',
                    use: props.template.file.namespace?.use?.map((value) => {
                        if (value.id === id) {
                            return {
                                id: value.id,
                                value: newValue,
                            };
                        }
                        return value;
                    }
                    ) ?? [],
                }
            }
        }));
    }

    function handleRemoveNamespaceUse(id: number | string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                namespace: {
                    ...props.template.file.namespace,
                    name: props.template.file.namespace?.name ?? '_namespace',
                    use: props.template.file.namespace?.use?.filter((value) => value.id !== id) ?? [],
                }
            }
        }));
    }

    function handleAddFileItem(itemType: string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                [itemType]: {
                    name: `_${itemType}`
                }
            }
        }));
    }

    function handleRemoveFileItem(itemType: string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                [itemType]: undefined
            }
        }));
    }

    function handleAddNamespaceItem(itemType: string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                namespace: {
                    ...props.template.file.namespace,
                    name: props.template.file.namespace?.name ?? '_namespace',
                    [itemType]: {
                        name: `_${itemType}`
                    }
                }
            }
        }));
    }

    function handleRemoveNamespaceItem(itemType: string) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                namespace: {
                    ...props.template.file.namespace,
                    name: props.template.file.namespace?.name ?? '_namespace',
                    [itemType]: undefined
                }
            }
        }));
    }

    function handleChangeNamespaceName(e: ChangeEvent<HTMLInputElement>) {
        props.setTemplate(prevTemplate => ({
            ...prevTemplate,
            file: {
                ...props.template.file,
                namespace: {
                    ...props.template.file.namespace,
                    name: e.target.value
                }
            }
        }));
    }

    return (
        <Accordion defaultActiveKey="root" className="accordion-node editor">
            <Accordion.Item eventKey="root">
                <Accordion.Header>Template</Accordion.Header>
                <Accordion.Body>
                    <>
                        {Object.keys(props.template).map((key: string) => key !== 'file' && <Node key={key} title={key} value={props.template[key as 'name'|'filename'|'path']} onChange={(e) => props.setTemplate(prevVal => ({ ...prevVal, [key]: e.target.value }))} />)}
                        <CollapsedNode eventKey="file" header="File">
                            <Node title="strict" type="checkbox" />
                            <Node.Array title="use" onAdd={handleAddFileUse} addButtonTitle="Add use statement">
                                {props.template.file.use?.map((item, key) => <InputGroup key={item.id}>
                                    <Form.Control type="text" value={item.value} onChange={e => handleChangeFileUse(item.id, e.target.value)} />
                                    <InputGroup.Text as={Button} className="btn-danger" onClick={() => handleRemoveFileUse(item.id)}><i className="fa fa-trash"></i></InputGroup.Text>
                                </InputGroup>)}
                            </Node.Array>
                            {!fileIsEmpty() ? <>
                                {props.template.file.class && <ClassNode onClose={() => handleRemoveFileItem('class')} onClassChange={handleChangeClass} class={props.template.file.class} />}
                                {props.template.file.interface && <InterfaceNode onClose={() => handleRemoveFileItem('interface')} onInterfaceChange={handleChangeInterface} interface={props.template.file.interface} />}
                                {props.template.file.trait && <TraitNode onClose={() => handleRemoveFileItem('trait')} onTraitChange={handleChangeTrait} trait={props.template.file.trait} />}
                                {props.template.file.namespace && <CollapsedNode eventKey="namespace" header={setNodeHeader('Namespace', props.template.file.namespace.name)} closeButton onCloseClick={() => handleRemoveFileItem('namespace')}>
                                    <Node title="name" onChange={handleChangeNamespaceName} />
                                    <Node.Array title="use" onAdd={handleAddNamespaceUse} addButtonTitle="Add use statement">
                                        {props.template.file.namespace.use?.map((item, key) => <InputGroup key={item.id}>
                                            <Form.Control type="text" value={item.value} onChange={e => handleChangeNamespaceUse(item.id, e.target.value)} />
                                            <InputGroup.Text as={Button} className="btn-danger" onClick={() => handleRemoveNamespaceUse(item.id)}><i className="fa fa-trash"></i></InputGroup.Text>
                                        </InputGroup>)}
                                    </Node.Array>
                                    {props.template.file.namespace.class && <ClassNode onClose={() => handleRemoveNamespaceItem('class')} onClassChange={cls => handleChangeClass(cls, true)} class={props.template.file.namespace.class} />}
                                    {props.template.file.namespace.interface && <InterfaceNode onClose={() => handleRemoveNamespaceItem('interface')} onInterfaceChange={inter => handleChangeInterface(inter, true)} interface={props.template.file.namespace.interface} />}
                                    {props.template.file.namespace.trait && <TraitNode onClose={() => handleRemoveNamespaceItem('trait')} onTraitChange={trait => handleChangeTrait(trait, true)} trait={props.template.file.namespace.trait} />}
                                    {namespaceIsEmpty() && <DropdownButton title="Add item">
                                        <Dropdown.Item onClick={() => handleAddNamespaceItem('class')}>Class</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleAddNamespaceItem('interface')}>Interface</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleAddNamespaceItem('trait')}>Trait</Dropdown.Item>
                                    </DropdownButton>}
                                </CollapsedNode>}
                            </> : <DropdownButton title="Add item">
                                <Dropdown.Item onClick={() => handleAddFileItem('namespace')}>Namespace</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleAddFileItem('class')}>Class</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleAddFileItem('interface')}>Interface</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleAddFileItem('trait')}>Trait</Dropdown.Item>
                            </DropdownButton>}
                        </CollapsedNode>
                    </>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
