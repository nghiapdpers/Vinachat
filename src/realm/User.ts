import Realm from "realm";

class User extends Realm.Object {
    static schema: { name: string; properties: { user_id: string; join_time: string; left_time: string; }; };
}
User.schema = {
    name: "User",
    properties: {
        user_id: 'string',
        join_time: 'string',
        left_time: 'string'
    },
};

export default User;