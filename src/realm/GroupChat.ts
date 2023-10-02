import Realm from 'realm';
 

class GroupChat extends Realm.Object {
    static schema: Realm.ObjectSchema = {
        name: 'GroupChat',
        primaryKey: 'ref',
        properties: {
            ref: 'string',
            member: { type: 'list', objectType: 'User' },
            message: { type: 'list', objectType: 'Message' },
        },
    };
}

export default GroupChat;
