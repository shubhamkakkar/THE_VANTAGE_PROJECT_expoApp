import { TOKEN } from "../../actions";

const initialState = ""

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOKEN: {
            return payload
        }
        default: {
            return state
        }
    }
};