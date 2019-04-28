declare module 'ecstatic' {

    type Options = {
        root: string,
        showDir: boolean
    }
    export default function createMiddleware(options: Options): (req: any, res: any, next: any) => void;
}