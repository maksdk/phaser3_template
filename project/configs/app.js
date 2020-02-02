//@ts-check
const currentEnv = "local";
const currentBuild = "development";

export default {
   "serverUrl": "https://testapps.host/find_diff/od/htdocs/index.php",
   
   "environment": currentEnv,
   "build": currentBuild,

   "environments": {
      "ok": "ok",
      "vk": "vk",
      "local": "local"
   },

   "ok": {
      "APP_ID": "1279952643",
      "APP_KEY": 'CBAIILENEBABABABA',
      "SECRET_KEY": "FB0914436CC997C6242DCE60",
      "API_SERVER": "https://api.ok.ru/",
      "GROUP_ID": "55502585004178",
      "GROUP_URL": "https://ok.ru/group/55502585004178"
   },
   
   "vk": {
      "API_ID": "7125532",
      "API_VERSION": "5.101",
      "GROUP_ID": "",
      "GROUP_URL": ""
   },
   
   "local": {
      "userUid": "111111111"
   }
};