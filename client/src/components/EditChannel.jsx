import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import { UserList } from './'
import { CloseCreateChannel } from '../assets'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {

  const handleChange = (event) => {
    event.preventDefault()

    setChannelName(event.target.value)
  }

  return (
    <div className='channel-name-input__wrapper'>
      <p>Channel</p>
      <input value={channelName} onChange={handleChange} placeholder='Nom du channel' />
      <p>Ajouter des membres</p>
    </div>
  )
}


const EditChannel = ({ setIsEditing }) => {

  const { channel } = useChatContext()
  const [channelName, setChannelName] = useState(channel?.data?.name)
  const [selectedUsers, setSelectedUsers] = useState([])

  const updateChannel = async (event) => {
    event.preventDefault()
    const nameChanged = channelName !== (channel.data.name || channel.data.id)

    if (nameChanged) {
      await channel.update({ name: channelName }, { text: `Le nom du channel à était changé en ${channelName}` })
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers)
    }
    setChannelName(null)
    setIsEditing(false)
    setSelectedUsers([])
  }

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p> Editer le channel </p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className='edit-channel__button-wrapper' onClick={updateChannel}>
        <p>Enregistrer les changements</p>
      </div>
    </div>
  )
}

export default EditChannel
