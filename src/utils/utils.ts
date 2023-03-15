import { v1 } from 'uuid';

export function setNodeHeader(type: string, name: string) {
    return `${type}${name !== '' ? ` - ${name}` : ''}`;
}

export function generateUUID(): string {
    return v1({
        clockseq: 0x1ad2,
    });
}

export const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number);

export function compareChanges<T extends { id: number|string, value?: any }>(value: T, id: string | number, newValue: any, isObject: boolean = false) {
    if (value.id === id) {
        if (isObject) {
            value.value = newValue ?? value.value;
        } else {
            value = newValue ?? value;
        }
    }
    return value;
}

export const compareArrays = (array1: unknown[], array2: unknown[]): boolean => {
    return array1.length == array2.length && array1.every(function(element, index) {
        return element === array2[index]; 
    });
}

export function injectStyles() {
    (function(){"use strict";try{if(typeof document!="undefined"){var t=document.createElement("style");t.appendChild(document.createTextNode(".app{width:60vw}ul.list{list-style:none}.editor{text-align:center}.editor input[type=text]{font-family:Menlo,Courier New,Courier,monospace}.dark-mode .editor input[type=text]{background-color:#212529;color:#adb5bd}.textarea-node textarea{font-family:Menlo,Courier New,Courier,monospace}.node-item{padding:.33rem 1rem;align-items:center;transition:all .2s ease}.node-item:nth-of-type(odd){background-color:#f5f5f5}.node-item:hover{background-color:#fff6e7}.dark-mode .node-item:nth-of-type(odd){background-color:#404040}.dark-mode .node-item:hover{background-color:#2c2d30}.accordion-header pre.item-name{margin-top:0;margin-bottom:0;background-color:#404040;color:#ffb86c;padding:.33rem;border-radius:5px}.accordion-header pre.item-name>code{white-space:break-spaces}.syntax-class{color:#ffcc95}.syntax-string{color:#19f9d8}.syntax-boolean,.syntax-number{color:#ffb86c}.syntax-type{color:#ff75b5}.syntax-extends{color:#ff9ac1}.syntax-operator{color:#e6e6e6}.syntax-function{color:#6fc1ff}.accordion-node .accordion-body{padding-left:0;padding-right:0}.grid,.node-item{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr}.span-1{grid-column-start:span 1}.span-2{grid-column-start:span 2}.span-3{grid-column-start:span 3}.span-4{grid-column-start:span 4}.span-5{grid-column-start:span 5}.span-6{grid-column-start:span 6}.span-7{grid-column-start:span 7}.span-8{grid-column-start:span 8}.span-9{grid-column-start:span 9}.span-10{grid-column-start:span 10}.span-11{grid-column-start:span 11}.span-12{grid-column-start:span 12}.text-left{text-align:left}.text-right{text-align:right}")),document.head.appendChild(t)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
}
