function Picture({ url }) {
    return (
        <>
            <img src={url} className="pt-5 w-3/4 block"/>
            <p className="pb-5 text-red-600">Report</p>
        </>
    );
  }
  
export default Picture
  