import Banner from "../Utilities/Banner"
import DynamicPage from "../Components/UsefulLinks/DynamicPage"
import { useEffect } from "react"

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div className="md:pt-20 pt-16">
      <Banner head={"Privacy Policy"} />
      <DynamicPage keyName="privacy-policy" title="Privacy Policy" />
    </div>
  )
}

export default Privacy