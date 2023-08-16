import { useState, useEffect } from "react";
import { PaperClip } from "../Icons";

const ImageUpload = ({ getPreviews, icon: Icon }) => {
  const [selectedFile, setSelectedFile] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      getPreviews(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);

    getPreviews(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <label htmlFor="fileImg">
        <Icon />
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        id="fileImg"
        onChange={onSelectFile}
      />
    </div>
  );
};
export default ImageUpload;
