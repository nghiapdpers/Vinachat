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
      status: 'string',
      type: 'string',
    },
  };
  static isLive = true;
}

export default Message;