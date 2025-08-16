import { useEffect, useState } from "react";
import "./App.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Posts:</h1>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
