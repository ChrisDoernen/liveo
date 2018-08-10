class LiveStream {

    constructor(public id: string,
        public description: string,
        public countryCode: string){
    }

    deserialize(input: any){
        this.id = input.id;
        this.description = input.description;
        this.countryCode = input.countryCode;
    }
}