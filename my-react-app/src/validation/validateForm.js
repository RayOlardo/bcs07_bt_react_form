// Validate form rỗng
export const validateForm = (data) => {
    const {id, name, phone, email} = data
    if(id !== "" && name !== "" && phone !== "" && email !== ""){
      return true
    }
  }