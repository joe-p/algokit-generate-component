/* eslint-disable no-console */
import algosdk from 'algosdk'
import { ReactNode, useState } from 'react'
import { DaoClient, MethodArgs } from './DaoClient.ts'

type Props = {
  algodClient: algosdk.Algodv2
  appID: number
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: DaoClient
  args: MethodArgs<'getVotes()(uint64,uint64)'>
}

const DaoGetvotes = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getVotes with args: ${JSON.stringify(props.args)}`)
    await props.typedClient.getVotes(props.args)
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default DaoGetvotes