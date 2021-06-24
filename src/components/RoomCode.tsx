import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string
}

export const RoomCode = (props: RoomCodeProps) => {
  const copyRoomCode = () => {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCode} >
      <div>
        <img src={copyImg} alt="CopyImg" />
      </div>
      <span> Sala #{props.code}</span>
    </button>
  )
}