const Button = props => {
  return props.isRender ? (
    <button className="Button" onClick={props.loadMore}>
      Load more
    </button>
  ) : null;
};

export default Button;
