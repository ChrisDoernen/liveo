export class LiveStream {

    constructor(public id: string,
        public description: string,
        public countryCode: string){
    }

    static deserialize(input: any): LiveStream{
        const id = input.Id;
        const description = input.Description;
        const countryCode = input.CountryCode;

        return new LiveStream(id, description, countryCode);
    }
}