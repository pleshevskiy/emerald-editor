type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
};

declare module '*.scss' {
    const content: { [className: string]: string };
    export = content
}
