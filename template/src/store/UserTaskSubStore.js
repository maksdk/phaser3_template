//@ts-check
export default class UserTaskSubStore {
    constructor(store) {
        this.store = store;

        this.gettersNames = [
            "tasks"
        ];

        this.initGetters();

        this.taskList = [
            {id: "1", body: "Task1", state: "done" },
            {id: "1", body: "Task1", state: "inprogress" }
        ];
    }

    initGetters() {
        this.gettersNames.forEach(name => {
            this.store.addGetter(name, () => this[name]);
        });
    }

    setData() {

    }

    get tasks() {
        return this.taskList;
    }
}