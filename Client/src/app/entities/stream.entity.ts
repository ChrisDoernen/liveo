export class Stream {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public countryCode: string) {
        console.debug(`Instantiating stream with id ${id}.`);
    }

    public static deserialize(input: any): Stream {
        const id = input.id;
        const title = input.title;
        const description = input.description;
        const countryCode = input.countryCode;

        return new Stream(id, title, description, countryCode);
    }
}
