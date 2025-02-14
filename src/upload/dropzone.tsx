import DragandDrop from "../assets/drag-and-drop.svg";
import type { UploadImage } from "./upload";

const DropZone = ({
  handleImageDrop,
}: {
  handleImageDrop: (v: UploadImage[]) => void;
}) => {
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const droppedImages: UploadImage[] = [];

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        const inputFile = item.getAsFile();
        if (inputFile && inputFile.type.includes("image")) {
          droppedImages.push({
            name: inputFile.name,
            src: URL.createObjectURL(inputFile),
          });
        }
      });
    }

    handleImageDrop(droppedImages);
  };

  return (
    <>
      <section
        className="description dropzone"
        id="upload_drop_zone"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Drag and drop your files here</p>
        <img src={DragandDrop} className="icon" alt="upload-dropzone" />
      </section>
    </>
  );
};

export default DropZone;
