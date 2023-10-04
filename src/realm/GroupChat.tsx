import Realm from "realm";

class GroupChat extends Realm.Object {
    static schema: { name: string; primaryKey: string; properties: { group_id: string; from_id: string; message_text: string; sent_time: string; }; };
}
GroupChat.schema = {
    name: "GroupChat",
    primaryKey: "group_id",
    properties: {
        group_id: "string",
        from_id: "string",
        message_text: "string",
        sent_time: "string",
    },
};

export default GroupChat;