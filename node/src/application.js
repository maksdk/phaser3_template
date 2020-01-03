//@ts-check

import _ from "lodash";

const app = () => {
    const result1 = _.flattenDeep([[1], [2], [[3], [4]]]); // [1, 2, 3, 4]

    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    const result2 = _.get(object, 'a[0].b.c'); // 3
    const result3 = "result3";

    console.dir(result1);
    console.log(result2);
    console.log(result3);
};
export default app;