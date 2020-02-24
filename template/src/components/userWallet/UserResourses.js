//@ts-check
import BaseComponent from "../../libs/BaseComponent";
import EnergyView from "./energy/EnergyView";

export default class UserResoursesComponent extends BaseComponent {
    constructor(config) {
        super(config);

        this.energyView = null;
    }

    init() {
        this.energyView = new EnergyView(this.scene);
    }

    run() {
		//@ts-ignore
        const energy = this.store.userEnergy;
        this.energyView.updateState(energy);
        this.layout.add(this.energyView);
		
		//@ts-ignore
        this.store.on("updateUserEnergy", this.updateEnergy, this);
    }

    updateEnergy(state) {
        console.log("updateUserEnergy", state)
        this.energyView.updateState(state);
    }
}