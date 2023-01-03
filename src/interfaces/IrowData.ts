export type IrowData ={
    _id: string | undefined;
    guide: string;
    category: string | undefined;
    title: string;
    filePaths: string;
    view: string;
    edit: string;
    delete: string | undefined | object
}[]