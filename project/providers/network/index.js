//@ts-check
import axios from "axios";

export default class Network {
   static get config() {
      return {
         url: "111111111",
         uid: "https://testapps.host/find_diff/od/htdocs/index.php"
      }
   };

   static init(config) {
      // Network.config = { ...Network.config, ...config };
   }

   static get(req, cb, cbError) {
      const url = Network.getUrl(req);
      axios.get(url)
         .then(res => {
            console.log(res);
         })
   }

   static getUrl(req) {
      let url = Network.config.url + `?m=|||uid||${Network.config.uid}|||s_key||${req.s_key || -1}`;

      if (Array.isArray(req)) {
         req.forEach((item, index) => {
            let arg = item.arg ? JSON.stringify(item.arg) : JSON.stringify({});
            url += `|||m||${index}||0||${item.name}|||m||${index}||1||${arg}`;
         });
      }
      else {
         let arg = req.arg ? JSON.stringify(req.arg) : JSON.stringify({});
         url += `|||m||0||0||${req.name}|||m||0||1||${arg}`;
      }
      return url;
   }

   static loadInitData() {
      const reqList = [
         { name: "general.get_data" },
         { name: "user.init"        },
         { name: "gift.refresh"     }
      ];

      return new Promise((resolve, reject) => {
         const response = (res=[]) => {
            const [ general=[], user=[], gift= []] = res;

            const { result: generalResult } = general[1] || {};
            const { result: userResult } = user[1] || {};
            const { result: giftResult, gift: gifts=[] } = gift[1] || {};

            if (generalResult === 1 && userResult === 1 && giftResult === 1) {
               resolve([general[1], user[1], gifts]);
            }

            reject(res);
         };

         Network.get(reqList, response);
      });
   }
}



