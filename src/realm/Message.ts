// import Realm from 'realm';
import { createRealmContext, Realm } from '@realm/react';

class Message extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Message',
    primaryKey: 'ref',
    properties: {
      ref: 'string',
      from: 'string',
      message: 'string',
      sent_time: 'int',
      type: 'string',
      from_name: 'string',
      call_status: 'string',
      end_call_reason: 'string',
      call_time: 'int',
      images: { type: 'list', objectType: 'Images' },
    },
  };
  static isLive = true;
}

export default Message;
