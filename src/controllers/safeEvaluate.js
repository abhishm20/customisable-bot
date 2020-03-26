import {Service} from "./translate";

const safeEval = require('safe-eval');

const context = {
    process: process,
    Service: Service
};


export const safe_eval = (code) => {
    return safeEval(code, context)
};
