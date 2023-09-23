/* eslint-disable no-console */
import algosdk from 'algosdk'
import { ReactNode, useState } from 'react'
import { Dao, DaoClient } from '../DaoClient.ts'

/* Example usage
<DaoGetRegisteredASA
  algodClient={algodClient}
  appID={appID}
  buttonClass="btn m-2"
  buttonLoadingNode=<span className="loading loading-spinner" />
  buttonNode="Call getRegisteredASA"
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
  returnCallback?: (returnValue: Dao['methods']['getRegisteredASA()uint64']['returns']) => void
}

const DaoGetRegisteredASA = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getRegisteredASA`)
    const result = await props.typedClient.getRegisteredASA({
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

export default DaoGetregisteredasa