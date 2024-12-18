import { configureStore } from "@reduxjs/toolkit";

import { navReducer,togle } from "./nav.redux";
const store = configureStore({
    reducer:{
        activeNav:navReducer,
        togle:togle,
    }
})

export default store