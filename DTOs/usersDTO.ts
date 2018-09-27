export class usersDTO {
    public userName: String;
    public firstName: String;
    public lastName: String;
    public email: String;
    public phone: String;
    public additionalInformation: String;
    public createdDate: Date;

    constructor(userName: String, firstName: String, lastName: String, email: String, phone: String) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
}