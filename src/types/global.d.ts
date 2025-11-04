declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.json' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
}
