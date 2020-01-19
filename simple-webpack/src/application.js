//@ts-check
import _ from "lodash";

export default () => {
    console.log(_.join(['Hello', 'webpack'], ' '));
    console.log(_.join(['Hello', 'lodash'], ' '));
    console.log(_.join(['Hello', 'live vs code server'], ' '));
};