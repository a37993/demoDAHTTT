import { useReducer } from "react";
import reducer, { initState, getInitState } from './reducer'
import logger from "./logger";
import Context from "./Context";
// cung cấp trạng thái ứng dụng và hàm dispatch cho các component con thông qua một context.
function Provider({ children }) {
    const [state, dispatch] = useReducer(logger(reducer), initState, getInitState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider