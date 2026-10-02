function Button({children, variant="primary"}){
    return(
        <button className={`btn-container ${variant}`}>
            {children}
        </button>
  );
}

export default Button;