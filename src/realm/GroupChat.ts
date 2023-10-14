// import Realm from 'realm';
import {createRealmContext, Realm} from '@realm/react';

class GroupChat extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'GroupChat',
    primaryKey: 'ref',
    properties: {
      ref: 'string',
      name: 'string',
      total_member: 'int',
      adminRef: 'string',
      latest_message_from: 'string',
      latest_message_from_name: 'string',
      latest_message_text: 'string',
      latest_message_type: 'string',
      latest_message_sent_time: 'int',
      members: {type: 'list', objectType: 'User'},
      messages: {type: 'list', objectType: 'Message'},
    },
  };
  static isLive = true;
  ref: any;
  messages: any;
}

export default GroupChat;
