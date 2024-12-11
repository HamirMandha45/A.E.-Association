import { configureStore } from "@reduxjs/toolkit";

import { navReducer } from "./nav.redux";

const store = configureStore({
    reducer:{
        activeNav:navReducer,
    }
})

export default store