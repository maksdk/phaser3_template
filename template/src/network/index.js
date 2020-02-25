//@ts-check
//@ts-ignore
import axios from "axios";
import { GeneralResponseParser, UserResponseParser, GiftResponseParser } from "./responseParsers/index";


export default class Network {
    static get config() {
        return {
            uid: "111111111",
            url: "https://testapps.host/find_diff/od/htdocs/index.php"
        }
    };

    static async get(req) {
        try {
            const result = await axios.get(Network.getUrl(req));
            const {  data } = result;
            return { response: data };
        } catch(error) {
            return { error: error || "Http error" };
        }
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

    static async loadInitData() {
        const reqList = [
            { name: "general.get_data" },
            { name: "user.init" },
            { name: "gift.refresh" }
        ];

        const result = await Network.get(reqList);
        const { error, response } = result;
       
        if (error) {
            return { error };
        }
        
		const  [ general = [], user = [], gift = []] = response;
		
		const parsedGeneral = GeneralResponseParser.parse(general);
		const parsedUser = UserResponseParser.parse(user);
		const parsedGift = GiftResponseParser.parse(gift);
    
		return {...parsedGeneral, ...parsedGift, ...parsedUser };
    }
}
