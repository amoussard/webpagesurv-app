export class Watch {
    constructor(public url: string,
                public cron: string,
                public text: string,
                public changed: boolean,
                public id?: string
    ) {}
}