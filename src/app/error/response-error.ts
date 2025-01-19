export class ResponseError extends Error {
    constructor(public status: number, public messsage: string){
        super(messsage)
    }

}