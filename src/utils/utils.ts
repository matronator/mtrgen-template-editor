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
