export default function promiseReducer(state, { type, status, name, payload, error }) {
    if (state === undefined) {
        return {};
    }

    if (type === "PROMISE") {
        return {
        ...state,
        [name]: { status, payload, error },
        };
    }
    return state;
}
