import axios from 'axios'

const getData = async (path) => {
  try {
    if (!path) return

    const { data } = await axios.get(`http://49.50.167.136:9871/api${path}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export default getData
