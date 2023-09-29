export const Button = ({ onClick }) => {
  return (
    <div className="ButtonContainer">
      <button onClick={onClick} className="Button">
        Load more
      </button>
    </div>
  );
};
