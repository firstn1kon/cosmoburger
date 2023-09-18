export interface IBasicIngredient {
    _id: string,
    name: string,
    type: TypesMenu,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_large: string,
    image_mobile: string,
    __v: number,
}

export interface IConcstructorIngredient extends IBasicIngredient {
    _uid: string
}

export enum TypesMenu  {
    BUN = "bun",
    MAIN = "main",
    SAUCE = "sauce"
}

export interface IBaseOrderWs  {
    _id: string;
    createdAt: string;
    updatedAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
}

 export  type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]