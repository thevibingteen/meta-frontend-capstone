import { getClassNameFromArray } from './component';

describe('getClassNameFromArray', () => {
    it('should join multiple class names with a space', () => {
        const result = getClassNameFromArray(['class1', 'class2', 'class3']);
        expect(result).toBe('class1 class2 class3');
    });

    it('should trim extra spaces from the result', () => {
        const result = getClassNameFromArray([' class1', 'class2 ', ' class3 ']);
        expect(result).toBe('class1 class2 class3');
    });

    it('should return an empty string for an empty array', () => {
        const result = getClassNameFromArray([]);
        expect(result).toBe('');
    });

    it('should return the single class name if the array has one element', () => {
        const result = getClassNameFromArray(['class1']);
        expect(result).toBe('class1');
    });

    it('should handle falsy or empty string values gracefully', () => {
        const faultyClasses = ['class1', '', undefined, null, 'class2'] as string[];
        const result = getClassNameFromArray(faultyClasses);
        expect(result).toBe('class1 class2');
    });
});
