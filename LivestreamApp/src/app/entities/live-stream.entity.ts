export class LiveStream {

    constructor(public id: string,
        public title: string,
        public description: string,
        public countryCode: string){
    }

    static deserialize(input: any): LiveStream{
        const id = input.Id;
        const title = input.Title;
        const description = input.Description;
        const countryCode = input.CountryCode;

        return new LiveStream(id, title, description, countryCode);
    }
}