import { useState } from "react";
import DropZone from "./dropzone";
import { v4 as uuidv4 } from "uuid";
import UploadPreview from "./upload-preview";

export type UploadImage = {
  id: string;
  name: string;
  src: string;
};

const Upload = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadImage[]>([]);

  const handleImageDrop = (v: UploadImage[]) => {
    setUploadedImages((prev) => [...prev, ...v]);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputImages: UploadImage[] = [];
    if (e.target.files && e.target.files.length > 0) {
      [...e.target.files].forEach((file) => {
        if (file.type.includes("image")) {
          inputImages.push({
            id: uuidv4(),
            name: file.name,
            src: URL.createObjectURL(file),
          });
        }
      });
    }

    setUploadedImages((prev) => [...prev, ...inputImages]);
  };

  const handleImageDelete = (id: string) => {
    setUploadedImages((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <article className="card upload">
      <header>
        <h3>Upload files</h3>
      </header>
      <section>
        <DropZone handleImageDrop={handleImageDrop} />
        <UploadInput handleImageInput={handleImageInput} />
        <UploadPreview
          previewImages={uploadedImages}
          handleImageDelete={handleImageDelete}
        />
      </section>
      <footer>
        <button className="ghost close-button">Close</button>
      </footer>
    </article>
  );
};

const UploadInput = ({
  handleImageInput,
}: {
  handleImageInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <section className="upload-file-wrapper">
      <p className="description">Or </p>
      <div className="upload-file">
        <label htmlFor="upload_images_input" className="upload-button">
          Upload Files
        </label>
        <input
          type="file"
          id="upload_images_input"
          onChange={(e) => handleImageInput(e)}
          multiple
        />
      </div>
    </section>
  );
};

export default Upload;
