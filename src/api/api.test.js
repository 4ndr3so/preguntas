import {fetchData} from "./api"
describe(
    "prueba funcion api",()=>{

        test("debe retornar un json",()=>{
             const result= fetchData;
             expect(typeof result).toBe('object')
        })

    
    }
)