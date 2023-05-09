export interface columnsType{
    label:string,
    name:string
}


export type operationsType={
    configure:Array<any>,
    delOptions?:{
        url:string
    },
    addOptions?:{
        url:string
    },
}
