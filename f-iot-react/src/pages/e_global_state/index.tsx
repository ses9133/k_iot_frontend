import ReIct from 'react'
import A_Context from './A_Context'
import ToggleSection from '@/components/ToggleSection'
import B_Zustand from './B_Zustand'
import SignIn from './SignIn'

function Index() {
  return (
    <div>
      <h1 style={{ backgroundColor: "black", color: "white" }}>
        === 전역 상태 관리 ===
      </h1>

      <ToggleSection title="1. Context API">
        <A_Context />
      </ToggleSection>

      <ToggleSection title="2. Zustand">
        <B_Zustand />
      </ToggleSection>

      <ToggleSection title="3. SignIn Page">
        <SignIn />
      </ToggleSection>

    </div>
  )
}
export default Index