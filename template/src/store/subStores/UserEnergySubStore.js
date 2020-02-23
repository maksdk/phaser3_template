//@ts-check
import BaseSubStore from "../../libs/BaseSubStore";

export default class UserEnergySubStore extends BaseSubStore {
    constructor(store) {
        super(store);

        this.state = "full"; 
        this.energy = 0;
        this.energyMax = 0;
        this.energyType = "0";
        this.timeToNextRecovery = -1; // время(в сек.) до следующего восстановления энергии
        this.timeToUnlimitedEnd = -1; // время(в сек.) до того как закончитеся действия неограниченной энергии (при energy_type=1)

        this.gettersNames = [
            "userEnergy"
        ];

        this.initGetters();
    }

    /**
     * @param {Object} data 
     * @param {Object} data.userEnergy 
     */
    setData(data) {
        if (!data || !data.userEnergy) return;

        const { userEnergy } = data;

        const { 
            energy = this.energy,
            energy_max = this.energyMax,
            energy_type = this.energyType,
            time_to_next_recovery = this.timeToNextRecovery,
            time_to_unlimited_end = this.timeToUnlimitedEnd
        } = userEnergy;

        this.energy = Number(energy);
        this.energyMax = Number(energy_max);
        this.energyType = String(energy_type);
        this.timeToNextRecovery = Number(time_to_next_recovery);
        this.timeToUnlimitedEnd = Number(time_to_unlimited_end);
        this.state = this.getState();

        this.store.emit("updateUserEnergy", this.userEnergy);
    }

    getState() {
        const currentEnergy = UserEnergySubStore.energies.find(energy => {
            return energy.type === this.energyType;
        }); 
        return currentEnergy.getState(this);
    }

    get userEnergy() {
        return {
            value: this.energy,
            state: this.state,
            recoveryTime: this.timeToNextRecovery,
            infinityTime: this.timeToUnlimitedEnd
        };
    }

    static energies = [
        // обычная энергия. может пребывать в двух состояниях - "full" и с временным востановлением ("recovery")
        { 
            type: "0", 
            getState: (userEnergy) => {
                if (userEnergy.timeToNextRecovery === -1) return "full";
                return "recovery";
            }
        },

        // неограниченное на заданное время энергия. имеет одно состояние - "time"
        { 
            type: "1", 
            states: [ "time" ],
            getState: (userEnergy) => {
                return "time";
            }            
        }, 

        // полностью безграничная энергия. имеет одно состояние - "infinity"
        { 
            type: "2", 
            getState: (userEnergy) => {
                return "infinity";
            }   
        }  
    ];
}