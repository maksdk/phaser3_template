//@ts-check
export default class UserResponseParser {
	static parse(data) {
		const { result } = data[1];
		if (result !== 1) {
			return { error: "User  error" };
		}

		const {  user, mission, company, stage, ...rest } = data[1];

		console.log(data[1])

		const { 
			money1, 
			energy, 
			energy_max, 
			energy_type, 
			time_to_next_recovery, 
			time_to_unlimited_end, 
			level,
			exp
		} = user;

		return { 
			userMission: mission,
			userCompany: company,
			userStage: stage,
			userEnergy: { 
				energy, 
				energy_max, 
				energy_type, 
				time_to_next_recovery, 
				time_to_unlimited_end 
			},

			money: { money: money1 },
			
			user: data 
		};
	}
}