//@ts-check
import BaseStore from "../../lib/BaseStore";

export default class Store extends BaseStore{
   constructor(app) {
      super();
      this.app = app;
   }
}