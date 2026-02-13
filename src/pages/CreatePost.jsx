import React, { useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaHeading,
  FaLink,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("url");
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  /* ✅ RESET FORM WHEN COMPONENT MOUNTS OR LOCATION CHANGES */
  useEffect(() => {
    // Get login data for author name
    const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");
    const defaultAuthor = loginData?.email?.split("@")[0] || "";

    // Check if we're in edit mode
    if (location.state?.editMode && location.state?.postData) {
      // EDIT MODE - Load post data
      const postData = location.state.postData;
      setIsEditMode(true);
      setPostId(postData.id);
      
      setFormData({
        title: postData.title || "",
        author: postData.author || defaultAuthor,
        description: postData.description || "",
        image: postData.image || "",
      });
      
      setPreviewImage(postData.image || "");
    } else {
      // CREATE MODE - Reset everything
      setIsEditMode(false);
      setPostId(null);
      
      setFormData({
        title: "",
        author: defaultAuthor,
        description: "",
        image: "",
      });
      
      setPreviewImage("");
      setActiveTab("url");
    }
  }, [location.state]); // Reset whenever location.state changes

  /* ✅ HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setPreviewImage(value);
  };

  /* ✅ VALIDATION */
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Post title required 🚨");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description required 🚨");
      return false;
    }
    if (!previewImage) {
      toast.error("Post image required 🚨");
      return false;
    }
    return true;
  };

  /* ✅ UPDATE POST */
  const handleUpdatePost = async () => {
    const updatedPost = {
      id: postId,
      title: formData.title,
      author: formData.author,
      description: formData.description,
      image: previewImage,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) throw new Error("Failed to update post");

      // Update localStorage
      const cachedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const updatedPosts = cachedPosts.map((post) =>
        post.id === postId ? updatedPost : post
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      toast.success("Post Updated Successfully! ✅");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error("Error updating post 🚨");
    }
  };

  /* ✅ CREATE POST */
  const handleCreatePost = async () => {
    const newPost = {
      title: formData.title,
      author: formData.author,
      description: formData.description,
      image: previewImage,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error("Failed to save post");

      const savedPost = await response.json();

      // Update localStorage
      const cachedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      localStorage.setItem("posts", JSON.stringify([...cachedPosts, savedPost]));

      toast.success("Post Published 🚀");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error("Error publishing post 🚨");
    }
  };

  /* ✅ SUBMIT HANDLER */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (isEditMode) {
      await handleUpdatePost();
    } else {
      await handleCreatePost();
    }
  };

  /* ✅ CANCEL */
  const handleCancel = () => {
    navigate("/dashboard");
  };

  /* ✅ FILE UPLOAD */
  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed 🚨");
      return;
    }
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
    toast.success("Image Uploaded ✅");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files[0]);
  };

  return (
    <div className="create-post-page">
      <Navbar />

      <div className="create-post-container">
        <header className="form-header">
          <h1>{isEditMode ? "Edit Post" : "Create a New Post"}</h1>
          <p>
            {isEditMode 
              ? "Update your post and republish!" 
              : "Share your thoughts with the world!"}
          </p>
        </header>

        <div className="post-form-card">
          <form onSubmit={handleSubmit}>
            
            {/* TITLE */}
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter a catchy title..."
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* AUTHOR */}
            <div className="form-group">
              <label>Author Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  value={formData.author}
                  readOnly
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label>Post Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="What's on your mind?"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            {/* IMAGE */}
            <div className="form-group">
              <label>Post Image</label>
                
              <div className="image-source-tabs">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === "url" ? "active" : ""}`}
                  onClick={() => setActiveTab("url")}
                >
                  Paste Image URL
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
                  onClick={() => setActiveTab("upload")}
                >
                  Upload File
                </button>
              </div>
              

              {/* URL INPUT */}
              {activeTab === "url" && (
                <div className="input-wrapper">
                  <FaLink className="input-icon" />
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="Paste Image URL here"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* FILE UPLOAD */}
              {activeTab === "upload" && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileUpload"
                    hidden
                    onChange={handleFileInput}
                  />
                  <div
                    className="image-upload-area"
                    onClick={() => document.getElementById("fileUpload").click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <FaCloudUploadAlt className="upload-icon" />
                    <p>Drag & Drop Image Here</p>
                    <span>or Click to Upload</span>
                  </div>
                </>
              )}

              {/* IMAGE PREVIEW */}
              {previewImage && (
                <div className="image-preview-container">
                  <img src={previewImage} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      setPreviewImage("");
                      setFormData((prev) => ({ ...prev, image: "" }));
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="form-actions-row">
              <button type="submit" className="submit-btn">
                {isEditMode ? (
                  <><FaEdit /> Update Post</>
                ) : (
                  <><FaRegPaperPlane /> Publish Post</>
                )}
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;