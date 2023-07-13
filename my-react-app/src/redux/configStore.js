import {configureStore} from '@reduxjs/toolkit'
import { rootReducer } from './reducer/formReducer'

 const store = configureStore({
    reducer: {
        students: rootReducer
    }
})
export default store


