interface Resigner {
    (params: FormData): Promise<any>;
}


declare const api: {
    resigner: Resigner
}