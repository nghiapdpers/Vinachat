import Realm from 'realm';

class Message extends Realm.Object {
  static schema: {
    name: string;
    properties: {message_text: string; from_user_id: string; sent_time: string};
  };
}
Message.schema = {
  name: 'Message',
  properties: {
    message_text: 'string',
    from_user_id: 'string',
    sent_time: 'string',
  },
};

export default Message;
