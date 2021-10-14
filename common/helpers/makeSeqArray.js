const makeSeqArray = ({ start, end }) => {
  let arr = []
  for (let i = start; i <= end; i++) arr.push(i)

  return arr
}
export default makeSeqArray
