import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Resources = () => {
  axios.defaults.withCredentials = true;

  const { subjectId } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [ytLinks, setYTLinks] = useState([]);
  const [subject, setSubject] = useState(null);
  const [activeTab, setActiveTab] = useState("yt"); // yt | notes | docs

  useEffect(() => {
    if (subjectId) {
      fetchYTLinks();
    }
  }, [subjectId]);

  const fetchYTLinks = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/subjects/${subjectId}/ytLinks/getLinks`
      );

      if (data.success) {
        setYTLinks(data.links || []);
        setSubject(data.subject || null);
      } else {
        toast.warn(data.message || "Failed to fetch YouTube links");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="px-5 md:px-10 pt-5">
      {/* Subject Name */}
      <h1 className="text-2xl font-bold text-purple-900 mb-5">
        Resources for: {subject?.name || "Loading..."}
      </h1>

      {/* Tabs Navbar */}
      <div className="flex gap-3 mb-6 border-b border-purple-300">
        <button
          className={`px-4 py-2 rounded-t-md transition-all ${
            activeTab === "yt"
              ? "bg-purple-200 text-purple-900 font-semibold"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
          onClick={() => setActiveTab("yt")}
        >
          YouTube Links
        </button>
        <button
          className={`px-4 py-2 rounded-t-md transition-all ${
            activeTab === "notes"
              ? "bg-purple-200 text-purple-900 font-semibold"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
        <button
          className={`px-4 py-2 rounded-t-md transition-all ${
            activeTab === "docs"
              ? "bg-purple-200 text-purple-900 font-semibold"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
          onClick={() => setActiveTab("docs")}
        >
          Document Links
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "yt" && (
        <section>
          {ytLinks.length === 0 ? (
            <p className="text-gray-500">No YouTube links available.</p>
          ) : (
            <ul>
              {ytLinks.map((res) => (
                <li
                  key={res._id}
                  className="mb-3 p-3 bg-purple-50 rounded-lg shadow-sm"
                >
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 underline"
                  >
                    {res.heading}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {activeTab === "notes" && (
        <section>
          <p className="text-gray-500">Notes section coming soon.</p>
        </section>
      )}

      {activeTab === "docs" && (
        <section>
          <p className="text-gray-500">Document links section coming soon.</p>
        </section>
      )}
    </div>
  );
};

export default Resources;
