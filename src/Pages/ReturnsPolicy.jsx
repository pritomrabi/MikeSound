
import { useEffect } from 'react';
import DynamicPage from '../Components/UsefulLinks/DynamicPage'
import Banner from '../Utilities/Banner'

const ReturnsPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div className="md:pt-20 pt-16">
      <Banner head={"Refund and Returns Policy"} />
      <DynamicPage keyName="return-policy" title="Return Policy" />
    </div>
  )
}

export default ReturnsPolicy