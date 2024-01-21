export const setLogin = () => sessionStorage.setItem("state", "login");
export const setLogout = () => sessionStorage.removeItem("state");
export const getLogin = () => sessionStorage.getItem("state");
