import React, { useState, useEffect } from "react";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {};
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
      let pickedFile;
      let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
        setIsValid(false);
        fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className="imageupload">
      <input
        id={props.id}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
