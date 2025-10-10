import { apiRequest } from "../../api/api";
import { useEffect, useState } from "react";

// HTML decode function
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const DynamicPage = ({ keyName, title }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const res = await apiRequest("get", `/api/content/${keyName}/`);
      if (res.error) {
        setError("Content load hoini");
      } else {
        setContent(res.body); // backend e HTML string thakbe
      }
      setLoading(false);
    };
    fetchContent();
  }, [keyName]);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <h1 className="text-2xl font-semibold mb-1">{title}</h1>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: decodeHTML(content) }}
      />
    </div>
  );
};

export default DynamicPage;
