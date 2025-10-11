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
        setError("Info Upload Processing");
      } else {
        setContent(res.body); // backend e HTML string thakbe
      }
      setLoading(false);
    };
    fetchContent();
  }, [keyName]);

  if (loading) return <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">Loading...</p>;
  if (error) return <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">{error}</p>;

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
