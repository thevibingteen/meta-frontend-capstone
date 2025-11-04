export function getClassNameFromArray(classNames: unknown[]) {
    return classNames
        .filter((className) => typeof className === 'string')
        .map((className) => (className as string).trim())
        .filter(Boolean)
        .join(' ')
        .trim();
}
