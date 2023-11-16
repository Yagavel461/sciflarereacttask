import Loading from"../assets/images/ippoLoader.gif";


  function Loader() {
    return (
      <>
        
        <div id="ippopay_loading">
            <div className="ippopay_loading_img"><img className="loader_img" src={Loading} alt='' width="150"/></div>
        </div>
        
      </>
    );
  }
  export default Loader;