//@ts-check
export default class UserResponseParser {
	static parse(data) {
		const { result, user, ...rest } = data[1];
		if (result !== 1) {
			return { error: "User  error " };
		}

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