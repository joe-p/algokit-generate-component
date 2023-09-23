/* eslint-disable no-console */
import algosdk from 'algosdk'
import { ReactNode, useState } from 'react'
import { Dao, DaoClient } from '../DaoClient.ts'

/* Example usage
<DaoBootstrap
  algodClient={algodClient}
  appID={appID}
  buttonClass="btn m-2"
  buttonLoadingNode=<span className="loading loading-spinner" />
  buttonNode="Call bootstrap"
  typedClient={typedClient}
/>
*/
type Props = {
  algodClient: algosdk.Algodv2
  appID: number
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: DaoClient
  returnCallback?: (returnValue: Dao['methods']['bootstrap()uint64']['returns']) => void
}

const DaoBootstrap = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling bootstrap`)
    const result = await props.typedClient.bootstrap({
    })
    
    if (props.returnCallback) {
      props.returnCallback(result)
    }
    
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default DaoBootstrap