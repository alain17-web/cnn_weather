import './Loading.css'

const Loading = ({close}) => {
  return (
    <div className='loading'>
      <h2>Loading....</h2>
      <button onClick={close}>X</button>
    </div>
  )
}

export default Loading
