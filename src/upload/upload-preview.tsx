import { Icon } from "@iconify/react";
import { UploadImage } from "./upload";

const UploadPreview = ({
  previewImages,
  handleImageDelete,
}: {
  previewImages: UploadImage[];
  handleImageDelete: (id: string) => void;
}) => {
  return (
    <div className="upload-preview">
      {previewImages && previewImages.length <= 0 && (
        <p className="description">No images selected currently.</p>
      )}
      {previewImages && previewImages.length > 0 && (
        <>
          <p className="description">{previewImages.length} Selected Files:</p>
          <div className="image-list">
            {previewImages.map((item) => (
              <PreviewImage
                key={`uploadedImage-${item.id}`}
                src={item.src}
                id={item.id}
                handleImageDelete={handleImageDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PreviewImage = ({
  src,
  id,
  handleImageDelete,
}: {
  src: string;
  id: string;
  handleImageDelete: (id: string) => void;
}) => {
  return (
    <div className="image-preview-container">
      <button className="icon" onClick={() => handleImageDelete(id)}>
        <Icon icon="lucide:trash-2" width={10} />
      </button>
      <img src={src} />
    </div>
  );
};

export default UploadPreview;
