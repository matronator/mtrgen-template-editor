import "./styles/App.css";
import "./styles/Editor.css";
import "./styles/grid.css";
import "./styles/utils.css";
import { useState, useEffect, ChangeEvent } from "react";
import { Accordion, InputGroup, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { generateUUID, setNodeHeader } from "./utils/utils";
import { Template, Trait, Interface } from "./Schema";
import { CollapsedNode } from "./Nodes/CollapsedNode";
import { Node } from "./Nodes/Node";
import { ClassNode } from "./Nodes/Template/ClassNode";
import { InterfaceNode } from "./Nodes/Template/InterfaceNode";
import { TraitNode } from "./Nodes/Template/TraitNode";

interface EditorProps {
    onTemplateChange?: (template: Template) => void;
}

export function Editor(props: EditorProps) {
    const [template, setTemplate] = useState<Template>({
        name: 'Template',
        filename: '<%name%>Template',
        path: '<%path%>',
        file: {

        }
    });

    if (props.onTemplateChange !== undefined) {
        useEffect(() => {
            props.onTemplateChange!(template);
        }, [template]);
    }

    function fileIsEmpty() {
        return !template.file.class && !template.file.interface && !template.file.namespace && !template.file.trait;
    }

    function namespaceIsEmpty() {
        return !template.file.namespace || (!template.file.namespace.class && !template.file.namespace.interface && !template.file.namespace.trait);
    }

    function handleChangeTrait(trait: Trait | undefined, namespaced = false) {
        if (namespaced) {
            setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    namespace: {
                        ...prevTemplate.file.namespace,
                        name: prevTemplate.file.namespace?.name ?? 'Namespace',
                        trait
                    }
                }
            }));
        } else {
            setTemplate(prevTemplate => ({
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
            setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    namespace: {
                        ...prevTemplate.file.namespace,
                        name: prevTemplate.file.namespace?.name ?? 'Namespace',
                        interface: inter,
                    }
                }
            }));
        } else {
            setTemplate(prevTemplate => ({
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
            setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    namespace: {
                        ...prevTemplate.file.namespace,
                        name: prevTemplate.file.namespace?.name ?? 'Namespace',
                        class: classNode,
                    }
                }
            }));
        } else {
            setTemplate(prevTemplate => ({
                ...prevTemplate,
                file: {
                    ...prevTemplate.file,
                    class: classNode,
                }
            }));
        }
    }

    function handleAddFileUse() {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                use: template.file.use?.concat([{ id: generateUUID(), value: '' }]) ?? [{ id: generateUUID(), value: '' }]
            }
        })
    }

    function handleChangeFileUse(id: number | string, newValue: string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                use: template.file.use?.map((value) => {
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
        })
    }

    function handleRemoveFileUse(id: number | string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                use: template.file.use?.filter((value) => value.id !== id)
            }
        })
    }

    function handleAddNamespaceUse() {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                namespace: {
                    ...template.file.namespace,
                    name: template.file.namespace?.name ?? 'Namespace',
                    use: template.file.namespace?.use?.concat([{ id: generateUUID(), value: '' }]) ?? [{ id: generateUUID(), value: '' }]
                }
            }
        })
    }

    function handleChangeNamespaceUse(id: number | string, newValue: string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                namespace: {
                    ...template.file.namespace,
                    name: template.file.namespace?.name ?? 'Namespace',
                    use: template.file.namespace?.use?.map((value) => {
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
        })
    }

    function handleRemoveNamespaceUse(id: number | string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                namespace: {
                    ...template.file.namespace,
                    name: template.file.namespace?.name ?? 'Namespace',
                    use: template.file.namespace?.use?.filter((value) => value.id !== id) ?? [],
                }
            }
        })
    }

    function handleAddFileItem(itemType: string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                [itemType]: {
                    name: itemType
                }
            }
        });
    }

    function handleRemoveFileItem(itemType: string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                [itemType]: undefined
            }
        });
    }

    function handleAddNamespaceItem(itemType: string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                namespace: {
                    ...template.file.namespace,
                    name: template.file.namespace?.name ?? 'Namespace',
                    [itemType]: {
                        name: itemType
                    }
                }
            }
        });
    }

    function handleRemoveNamespaceItem(itemType: string) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                namespace: {
                    ...template.file.namespace,
                    name: template.file.namespace?.name ?? 'Namespace',
                    [itemType]: undefined
                }
            }
        });
    }

    function handleChangeNamespaceName(e: ChangeEvent<HTMLInputElement>) {
        setTemplate({
            ...template,
            file: {
                ...template.file,
                namespace: {
                    ...template.file.namespace,
                    name: e.target.value
                }
            }
        });
    }

    return (
        <Accordion defaultActiveKey="root" className="accordion-node editor">
            <Accordion.Item eventKey="root">
                <Accordion.Header>Template</Accordion.Header>
                <Accordion.Body>
                    <>
                        {Object.keys(template).map((key: string) => key !== 'file' && <Node key={key} title={key} />)}
                        <CollapsedNode eventKey="file" header="File">
                            <Node title="strict" type="checkbox" />
                            <Node.Array title="use" onAdd={handleAddFileUse} addButtonTitle="Add use statement">
                                {template.file.use?.map((item, key) => <InputGroup key={item.id}>
                                    <Form.Control type="text" value={item.value} onChange={e => handleChangeFileUse(item.id, e.target.value)} />
                                    <InputGroup.Text as={Button} className="btn-danger" onClick={() => handleRemoveFileUse(item.id)}><i className="fa fa-trash"></i></InputGroup.Text>
                                </InputGroup>)}
                            </Node.Array>
                            {!fileIsEmpty() ? <>
                                {template.file.class && <ClassNode onClose={() => handleRemoveFileItem('class')} onClassChange={handleChangeClass} class={template.file.class} />}
                                {template.file.interface && <InterfaceNode onClose={() => handleRemoveFileItem('interface')} onInterfaceChange={handleChangeInterface} interface={template.file.interface} />}
                                {template.file.trait && <TraitNode onClose={() => handleRemoveFileItem('trait')} onTraitChange={handleChangeTrait} trait={template.file.trait} />}
                                {template.file.namespace && <CollapsedNode eventKey="namespace" header={setNodeHeader('Namespace', template.file.namespace.name)} closeButton onCloseClick={() => handleRemoveFileItem('namespace')}>
                                    <Node title="name" onChange={handleChangeNamespaceName} />
                                    <Node.Array title="use" onAdd={handleAddNamespaceUse} addButtonTitle="Add use statement">
                                        {template.file.namespace.use?.map((item, key) => <InputGroup key={item.id}>
                                            <Form.Control type="text" value={item.value} onChange={e => handleChangeNamespaceUse(item.id, e.target.value)} />
                                            <InputGroup.Text as={Button} className="btn-danger" onClick={() => handleRemoveNamespaceUse(item.id)}><i className="fa fa-trash"></i></InputGroup.Text>
                                        </InputGroup>)}
                                    </Node.Array>
                                    {template.file.namespace.class && <ClassNode onClose={() => handleRemoveNamespaceItem('class')} onClassChange={cls => handleChangeClass(cls, true)} class={template.file.namespace.class} />}
                                    {template.file.namespace.interface && <InterfaceNode onClose={() => handleRemoveNamespaceItem('interface')} onInterfaceChange={inter => handleChangeInterface(inter, true)} interface={template.file.namespace.interface} />}
                                    {template.file.namespace.trait && <TraitNode onClose={() => handleRemoveNamespaceItem('trait')} onTraitChange={trait => handleChangeTrait(trait, true)} trait={template.file.namespace.trait} />}
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
