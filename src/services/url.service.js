
//local url 
const url = "http://localhost:3016"
// const url = "/api"


export const generateFilePath = (fileName) => {
  return `${url}/uploads/${fileName}`
}


export default url