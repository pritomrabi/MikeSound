const CheckoutName = ({ name }) => {
  return (
    <div>
      <label className=" p-1 text-primary font-Lato font-medium text-base">
        {name}
        <span className="required text-red-600">*</span>
      </label>
    </div>
  );
};

export default CheckoutName;
