import { useEffect } from 'react';
import DynamicPage from '../Components/UsefulLinks/DynamicPage'
import Banner from '../Utilities/Banner'

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="md:pt-20 pt-16">
            <Banner head={"Terms & Conditions"} />
            <DynamicPage keyName="terms-condition" title="Terms & Conditions" />
        </div>
    )
}

export default Terms