import { useState } from "react";
import "./create.css";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sourceCode: "",
    demoLink: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Project submitted");
  };

  return (
        <div className="create-page">
            <form className="create-card" onSubmit={handleSubmit}>
                <div className="create-left">
                    <div className="image-circle"></div>
                    
                    <label className="upload-btn">
                        Upload Image
                        <input type="file" name="image" accept="image/*" hidden onChange={handleChange} />
                    </label>
                    
                    <div className="category-box">
                        <h4>Category</h4>
                        
                        {[{ label: "Web App", value: "web" }, { label: "Mobile App", value: "mobile" }, { label: "UI / UX", value: "uiux" }, { label: "AI / ML", value: "ai" }, { label: "Other", value: "other" }].map((category) => (
                            <label key={category.value} className="category-item">
                                <input type="radio" name="category" value={category.value} onChange={handleChange} /> {category.label}  
                            </label>
                        ))}
                    </div>
                </div>
                
                <div className="create-right">
                    <h2>Upload Your Project</h2>
                    
                    <label>Project Name</label>
                    <input type="text" name="title" placeholder="Project Name" onChange={handleChange} />

                    <label>Project Description</label>
                    <textarea name="description" placeholder="Project Description" onChange={handleChange} />

                    <label>Source Code Link</label>
                    <input type="url" name="sourceCode" placeholder="GitHub Repository" onChange={handleChange} />

                    <label>Live Demo Link</label>
                    <input type="url" name="demoLink" placeholder="Live Demo URL" onChange={handleChange} />

                    <label>Price</label>
                    <input type="number" name="price" placeholder="Price (RS)" onChange={handleChange} />
                    
                    <button type="submit" className="submit-btn"> Upload </button>
                </div>
            </form>
        </div>
    );
};

export default Create;