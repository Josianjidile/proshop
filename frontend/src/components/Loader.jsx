const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          border: '4px dashed ',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite', 
        }}
      ></div>
      <span
        style={{
          fontSize: '1.1rem',
          color: '#333',
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}
      >
        Loading, please wait...
      </span>
    </div>
  );
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Loader;
