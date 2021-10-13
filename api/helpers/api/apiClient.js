import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const ApiClient = () => {
  const getData = async (url) => {
    try {
      if (!url) return

      const data = await axios.get(`${process.env.API_URL}${url}`)

      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export default ApiClient
