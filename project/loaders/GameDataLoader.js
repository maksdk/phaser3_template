//@ts-check
import CST from "../cst/game";
const { USER_AVATAR_PREFIX, MAX_COUNT_APP_FRIENDS } = CST;

export default class GameDataLoader {
   constructor(networkProvider, socialProvider, config) {
      this.networkProvider = networkProvider;
      this.socialProvider = socialProvider;
      this.config = config;

      this.loadMethods = {
         [this.config.environments.ok]: "loadSocialData",
         [this.config.environments.vk]: "loadSocialData",
         [this.config.environments.local]: "loadServerData"
      };

      this.socialData = {};

      this.serverData = {
         general: {},
         user: {},
         gifts: []
      };

      this.usersData = {
         appInfo: [],
         socialInfo: [],
         avatars: []
      };

      this.loadServerData = this.loadServerData.bind(this);
      this.loadSocialData = this.loadSocialData.bind(this);
      this.loadUsersData = this.loadUsersData.bind(this);
   }

   static blobToBase64(blob) {
      return new Promise((resolve, rejects) => {
         const reader = new FileReader();
         reader.onload = function () {
            const dataUrl = reader.result;
            resolve(dataUrl);
         };
         reader.readAsDataURL(blob);
      });
   };

   load() {
      const methodName = this.loadMethods[this.config.environment];

      return this[methodName]()
         .then(() => {
            const { uid = this.config.local.userUid } = this.socialData;

            const result = {
               userUid: uid,
               socialData: this.socialData,
               serverData: this.serverData,
               usersData: this.usersData
            };

            return Promise.resolve(result);
         })
         .catch(() => {
            return { error: `Game data is not loaded. Current environment: ${this.config.environment}`}
         });
   }

   loadServerData(uid) {
      uid = uid ||  this.config.local.userUid;

      this.networkProvider.init({ uid });

      return this.networkProvider.loadData()
         .then((data=[]) => {
            const [general, user, gifts ] = data;
            this.serverData = {
               general,
               user,
               gifts
            };
            return Promise.resolve();
         });
   }

   loadSocialData() {
      return new Promise(this.socialProvider.init)
         .then(data => {
            const { uid } = data;
            this.socialData = data;
            
            return Promise.resolve(uid);
         })
         .then(this.loadServerData)
         .then(this.loadUsersData);
   }

   loadUsersData() {
      const { uid } = this.socialData;

      let usersIds = [];
      let appUsersInfo = [];
      let socialUsersInfo = [];
      let usersAvatars = [];

      const result = this.loadUsersIds()
         .then(ids => {
            usersIds = ids;
            usersIds.splice(MAX_COUNT_APP_FRIENDS);

            const promises = [
               this.loadAppUsersInfo(usersIds),
               this.loadSocialUsersInfo(usersIds.join(",")),
               this.loadCurrentUseInfo(uid)
            ];

            return Promise.all(promises);
         })
         .then((res=[]) => {
            const [ appInfo, socialInfo, currUserInfo ] = res;
           
            appUsersInfo = appInfo;
            socialUsersInfo = socialInfo;

            return this.loadUsersAvatars([...socialInfo, ...currUserInfo]);
         })
         .then(avatars => {
            usersAvatars = avatars;
            return parseData();
         })
         .then(data => {
            this.usersData = data;
            return Promise.resolve();
         });   

      function parseData() {
         const avatars = [];

         const currUserAvatar = usersAvatars.find(({ uid: currUserID}) => currUserID === uid);
         if (currUserAvatar) {
            const { src } = currUserAvatar;
            avatars.push({ src, name: `${USER_AVATAR_PREFIX}${uid}` });
         }

         const socialInfo = socialUsersInfo.map(({ avatarUrl, ...rest }) => {
            const { uid: userUid } = rest;
            let src = "";

            const avatar = usersAvatars.find(({uid: avatarUid}) => {
               return avatarUid === userUid;
            });

            if (avatar) src = avatar.src || "";
            
            const avatarName = `${USER_AVATAR_PREFIX}${userUid}`;
            
            avatars.push({ src: src, name: avatarName });

            return {
               ...rest,
               avatarName
            };
         });

         return Promise.resolve({
            appInfo: appUsersInfo,
            socialInfo: socialInfo,
            avatars: avatars
         });
      };
      return result;
   }

   loadUsersIds() {
      return this.socialProvider.getAppFriends()
   }

   loadAppUsersInfo(ids) {
      this.networkProvider.users.loadUsers({ ids })
         .then((res=[]) => {
            const clearedUsers = res.filter(user => Object.keys(user).length > 1);
            return clearedUsers;
         });
   }

   loadSocialUsersInfo(ids) {
      return this.socialProvider.getUserInfo(ids);
   }

   loadCurrentUseInfo(uid) {
      return this.socialProvider.getCurrentUserInfo(uid);
   }

   loadUsersAvatars(users) {
      const avatars = [];
      let count = users.length;

      return new Promise((resolve, reject) => {
         users.forEach(({ avatarUrl: url, uid  }) => {
            fetch(url)
               .then(res => res.blob())
               .then(GameDataLoader.blobToBase64)
               .then(src => {
                  avatars.push({ src, uid });
                  count -= 1;
                  if (count <= 0) resolve(avatars);
               })
               .catch(error => {
                  console.log("Http error: ", error);
                  count -= 1;
                  if (count <= 0) resolve(avatars);
               });
         });
      });
   }
}