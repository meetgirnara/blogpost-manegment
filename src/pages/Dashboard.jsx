import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ FETCH POSTS */
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
      localStorage.setItem("posts", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      const cachedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      setPosts(cachedPosts);
      toast.error("Using cached data ⚠️");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  /* ✅ DELETE POST */
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      const cachedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      localStorage.setItem(
        "posts",
        JSON.stringify(cachedPosts.filter((post) => post.id !== id))
      );

      toast.success("Post Deleted ✅");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting post 🚨");
    }
  };

  /* ✅ EDIT POST */
  const handleEditPost = (post) => {
    // Navigate to create post with edit mode
    navigate("/create-post", { 
      state: { 
        editMode: true, 
        postData: post 
      } 
    });
  };

  const goToCreatePost = () => {
    // Clear any edit state before creating new post
    navigate("/create-post", { 
      state: { 
        editMode: false, 
        postData: null 
      } 
    });
  };

  /* ✅ CURRENT USER */
  const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");
  const currentUser = loginData?.email?.split("@")[0] || "User";

  /* ✅ STATS */
  const totalPosts = posts.length;
  const userPosts = posts.filter(
    (post) => post.author?.toLowerCase() === currentUser.toLowerCase()
  ).length;
  const communityPosts = totalPosts - userPosts;

  /* ✅ CHECK IF USER CAN EDIT/DELETE POST */
  const canModifyPost = (postAuthor) => {
    return postAuthor?.toLowerCase() === currentUser.toLowerCase();
  };

  return (
    <div className="dashboard-page">
      <Navbar onLogout={handleLogout} />

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h1>Welcome to Your Dashboard, {currentUser}!</h1>
          <p>Manage your posts and track engagement.</p>
        </div>

        {/* ✅ STATS */}
        <div className="dashboard-stats-overview">
          <div className="dash-card">
            <h3>Total Posts</h3>
            <span className="dash-number">{totalPosts}</span>
          </div>
          <div className="dash-card">
            <h3>Your Stories</h3>
            <span className="dash-number">{userPosts}</span>
          </div>
          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">{communityPosts}</span>
          </div>
        </div>

        {/* ✅ POSTS */}
        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button className="create-shortcut-btn" onClick={goToCreatePost}>
              <FaPlus /> New Post
            </button>
          </div>

          <div className="posts-grid">
            {loading ? (
              <div className="loading-state">Loading posts...</div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-image-container">
                    <img src={post.image} alt={post.title} />

                    {/* ✅ SHOW ACTIONS ONLY FOR USER'S POSTS */}
                    {canModifyPost(post.author) && (
                      <div className="post-actions">
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEditPost(post)}
                        >
                          <MdEdit size={22} color="#fff" />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <MdDelete size={20} color="#fff" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="post-card-content">
                    <div className="post-meta">
                      <span>By {post.author}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="post-card-title">{post.title}</h3>
                    <p className="post-card-description">{post.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-posts">
                <p>No posts yet 🚀</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;