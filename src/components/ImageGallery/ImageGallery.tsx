import { useState } from "react";

interface ImageData {
  images: string[];
}

export const ImageGallery: React.FC<ImageData> = ({ images }: ImageData) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          paddingBottom: "10px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{ width: "100%", height: "auto", cursor: "pointer" }}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image ?? ""} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Fullscreen"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </>
  );
};
