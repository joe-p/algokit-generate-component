/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { Dao, DaoClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<DaoGetProposal
  buttonClass="btn m-2"
  buttonLoadingNode=<span className="loading loading-spinner" />
  buttonNode="Call getProposal"
  typedClient={typedClient}
/>
*/
type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: DaoClient
  returnCallback?: (returnValue: Dao['methods']['getProposal()string']['returns']) => void
}

const DaoGetProposal = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getProposal`)
    const result = await props.typedClient.getProposal(
      {
      },
      {
        sender: { signer, addr: activeAddress! },
      },
    )
    
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

export default DaoGetProposal