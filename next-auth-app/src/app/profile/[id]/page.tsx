import React from 'react'

type Props = {
  params:{
    id:string
  }
}

const UserProfile = async({params}:Props) => {
  const paramsId = await params
  return (
    <div>UserProfile {paramsId.id}</div>
  )
}

export default UserProfile