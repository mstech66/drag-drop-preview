import { useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [dropText, setDropText] = useState("Drag and drop here");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file.type.startsWith("image/")) {
      console.log("its an image");
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages([...images, event.target.result]);
      };
      reader.readAsDataURL(file);
      setDropText("Drag and drop here");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropText("Drop it");
  };

  const handleClear = () => {
    setImages([]);
  };

  return (
    <div className="flex flex-col shrink-0">
      <div
        className="dragDropDiv"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dropText}
      </div>
      <br />
      <div className="viewport">
        {images.map((src, index) => (
          <div className="w-56 hover:shadow-xl transition ease-in duration-300 cursor-pointer">
            <img
              src={src}
              alt=""
              className="object-cover w-56 h-56 max-w-none"
            />
          </div>
        ))}
      </div>
      <br />
      <button disabled={images.length === 0} onClick={handleClear} className="primaryBtn">
        Clear
      </button>
    </div>
  );
}

export default App;
