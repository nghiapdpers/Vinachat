// import Realm from "realm";
import { createRealmContext, Realm } from '@realm/react';


class User extends Realm.Object {
    static schema: Realm.ObjectSchema = {
        name: 'User',
        primaryKey: 'user_id',
        properties: {
            user_id: 'string',
            join_time: 'date',
            left_time: 'date',
            role: 'string',
        },
    };
    static isLive = true;
}

export default User;