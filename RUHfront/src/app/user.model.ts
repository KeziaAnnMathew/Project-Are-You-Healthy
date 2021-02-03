export class UserModel{
    constructor(
        public fname:string,
        public lname:string,
        public email:string,
        public uname:string,
        public password:string,
        public gender:string,
        public height:number,
        public weight:number,
        public bmi:number,
        public pulse:number,
        public img:File|any,
        public _id:string

    ){

    }
}