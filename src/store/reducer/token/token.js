import {TOKEN} from "../../actions";
import {AsyncStorage} from 'react-native';

const initialState = ""

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case TOKEN: {
            AsyncStorage.setItem("TOKEN", payload)
            return payload
        }
        default: {
            return state
        }
    }
};
