const CheckoutName = ({ name }) => {
  return (
    <div>
      <label className=" p-1 text-primary-default dark:text-[#fcf1f1f4] font-Lato font-medium text-base">
        {name}
        <span className="required text-red-600"> *</span>
      </label>
    </div>
  );
};

export default CheckoutName;
