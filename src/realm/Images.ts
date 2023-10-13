// import Realm from 'realm';
import {createRealmContext, Realm} from '@realm/react';

class Images extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Images',
    properties: {url: 'string'},
  };
  static isLive = true;
}

export default Images;
