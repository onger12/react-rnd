import { PaperAreaMain, SidebarMain } from "../components"
import { ElementProvider } from "../context"

export const HomeScreen = () => {

  return (
    <div className="w-full h-full flex">
      <ElementProvider>
        <SidebarMain />
        <PaperAreaMain />
      </ElementProvider>
    </div>        
  )
}
