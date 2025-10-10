import { useEffect } from "react";
import PaymentInstructions from "../Components/UsefulLinks/PaymentInstructions"
import Banner from "../Utilities/Banner"

const Payment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="md:pt-20 pt-16">
            <Banner head={"Payment"} />
            <PaymentInstructions />
        </div>
    )
}

export default Payment