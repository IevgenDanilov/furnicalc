const Button = (onClick) => {
  return (
    <>
      <button onClick={() => onClick()}>+</button>
    </>
  );
};

export default Button;
