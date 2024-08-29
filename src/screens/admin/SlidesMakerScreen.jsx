import { ElementProvider } from "../../context"
import { PaperAreaMain, SidebarMain } from "../../components"
import { AdminWrapper } from "../../wrappers"

export const SlidesMakerScreen = () => {
  return (
    <AdminWrapper>
      <div className="w-full h-full flex">
        <ElementProvider>
          <SidebarMain />
          <PaperAreaMain />
        </ElementProvider>
      </div>  
    </AdminWrapper>
  )
}
