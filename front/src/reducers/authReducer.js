export default function (store = {}, action) {
    switch (action.type) {
        case "CREATE_TOKEN":
            console.log(action.token, "action");
            return { ...store, token: action.token, pseudoMail: action.pseudoMail }
        default:
            return store;
    }
}