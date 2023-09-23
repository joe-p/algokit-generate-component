/* eslint-disable no-console */
import algosdk from 'algosdk'
import { ReactNode, useState } from 'react'
import { Dao, DaoClient } from '../DaoClient.ts'

/* Example usage
<DaoRegister
  buttonClass="btn m-2"
  buttonLoadingNode=<span className="loading loading-spinner" />
  buttonNode="Call register"
  typedClient={typedClient}
  registeredASA={registeredASA}
/>
*/
type DaoRegisterArgs = Dao['methods']['register(asset)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: DaoClient
  registeredASA: DaoRegisterArgs['registeredASA']
}

const DaoRegister = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling register`)
    await props.typedClient.register({
      registeredASA: props.registeredASA,
    })
    
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default DaoRegister