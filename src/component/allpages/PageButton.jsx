import React, { Fragment } from "react";

const PageButton = ({ namebutton, url = "" , type = "button" ,  classname = '' , onClick ='' }) => {
  return (
    <Fragment>
      {url === "" ? (
        <button type={type} className={`py-2 px-4 uppercase font-semibold rounded-md ${classname}`} onClick={onClick}>{namebutton}</button>
      ) : (
        <a href={url} className={`py-2 px-4 uppercase font-semibold rounded-md ${classname}`}>{namebutton}</a>
      )}
    </Fragment>
  );
};

export default PageButton;
