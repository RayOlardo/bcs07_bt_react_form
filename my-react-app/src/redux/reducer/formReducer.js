const initialState = {
  students: {
    id: '',
    name: '',
    phone: '',
    email: '',
  }
}


export const rootReducer = (state = initialState ,action) => {
  switch(action.type){
    case 'addStudent':{
      return{
        ...state,
        students: {...state.students, ...action.payload}
      }
    }
    default: return state
  }

    
}