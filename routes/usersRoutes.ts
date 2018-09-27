import { Request, Response } from "express";
import { usersDTO } from "../DTOs/usersDTO";
import { addNewUser } from "../models/user";

export class UsersRoutes {
    public usersRoutes(app): void {
        // NEW USER
        app.route('/newUser').get((req: Request, res: Response) => {
            // userName: String, firstName: String, lastName: String, email: String, phone: String
            var user = new usersDTO('mlg_pussySlayerXXX', 'Johnny', 'Lakatos', 'youareexecuted@murder.kill', '6666666');
            addNewUser(user, function (err) {
                console.log('Err value: ' + err);
            });
        });
    }
}