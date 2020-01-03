import _ from "lodash";

const app = () => {
    const result = _.flattenDeep([[1], [2], [[3], [4]]]);
};
export default app;