import RedwoodCopilotDrawer from 'src/components/RedwoodCopilot/Drawer'

type RedwoodCopilotLayoutProps = {
  children?: React.ReactNode
}

const RedwoodCopilotLayout = ({ children }: RedwoodCopilotLayoutProps) => {
  return (
    <>
      <RedwoodCopilotDrawer open={false} />
      {children}
    </>
  )
}

export default RedwoodCopilotLayout
