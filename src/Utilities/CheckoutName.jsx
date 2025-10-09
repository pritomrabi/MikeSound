const CheckoutName = ({ name }) => {
  const parts = name.split(/(\*)/g); // split text where * appears

  return (
    <div>
      <label className="p-1 text-primary-default dark:text-[#fcf1f1f4] font-Lato font-medium text-base">
        {parts.map((part, i) =>
          part === "*" ? (
            <span key={i} className="text-red-500">
              *
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </label>
    </div>
  );
};

export default CheckoutName;
