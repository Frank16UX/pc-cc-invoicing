import { useState, useRef } from 'react'
import DevBar from './components/DevBar'
import TopBar from './components/TopBar'
import Proposal1 from './proposals/Proposal1'
import Proposal2 from './proposals/Proposal2'
import Proposal3 from './proposals/Proposal3'

export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  const proposal1Ref = useRef<{ insertTestData: () => void }>(null)
  const proposal2Ref = useRef<{ insertTestData: () => void }>(null)
  const proposal3Ref = useRef<{ insertTestData: () => void }>(null)

  const handleInsertTestData = () => {
    switch (activeTab) {
      case 0:
        proposal1Ref.current?.insertTestData()
        break
      case 1:
        proposal2Ref.current?.insertTestData()
        break
      case 2:
        proposal3Ref.current?.insertTestData()
        break
    }
  }

  const proposals = [
    <Proposal1 key="proposal1" ref={proposal1Ref} />,
    <Proposal2 key="proposal2" ref={proposal2Ref} />,
    <Proposal3 key="proposal3" ref={proposal3Ref} />
  ]

  return (
    <>
      <DevBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onInsertTestData={handleInsertTestData}
      />
      <TopBar />
      {proposals[activeTab]}
    </>
  )
}
