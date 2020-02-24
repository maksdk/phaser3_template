//@ts-check
import BaseView from "../../../libs/BaseView";

import EnergyFullView from "./EnergyFullView";
import EnergyInfinityView from "./EnergyInfinityView";
import EnergyRecoveryView from "./EnergyRecoveryView";
import EnergyViewTime from "./EnergyViewTime";

const views = [
	EnergyFullView,
	EnergyInfinityView,
	EnergyViewTime,
	EnergyRecoveryView
];

export default  class EnergyView extends BaseView {
    constructor(scene) {
		super(scene);

		this.views = views.reduce((acc, view ) => {
			if (acc.has(view.state)) {
				throw new Error(`Such view: ${view.state} is alreday registered!`);
			}
			acc.set(view.state, view);
			return acc;
		}, new Map());

		this.currentView = null;
    }

    updateState(params) {
		const { state } = params;
		
		// update current view 
		if (this.currentView && this.currentView.state === state) {
			this.currentView.updateState(params);
			return;
		}

		// remove old view
		if (this.currentView) {
			this.currentView.onExit();
			this.currentView.remove();
			this.currentView = null;
		}

		// add new view
		const ViewClass = this.views.get(state);
		this.currentView = new ViewClass(this);
		this.currentView.onEnter();
		this.add(this.currentView);
	}
}

