import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import ConfirmDelete from "../../components/ConfirmDelete";
import delete_icon from '../../assets/delete-icon.png'
import { Plus } from "lucide-react";
import yt_icon from '../../assets/yt-icon.jpg'
import no_data_icon2 from '../../assets/no-data-icon2.jpg'

const Resources = () => {
    axios.defaults.withCredentials = true;

    const { subjectId } = useParams();
    const { backendUrl, user } = useContext(AppContext);

    const [ytLinks, setYTLinks] = useState([]);
    const [subject, setSubject] = useState(null);
    const [activeTab, setActiveTab] = useState("yt");

    const [heading, setHeading] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [linkToDelete, setLinkToDelete] = useState(null);

    useEffect(() => {
        if (subjectId) {
            fetchYTLinks();
        }
    }, [subjectId]);

    const handleAddLink = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/subjects/${subjectId}/ytLinks/addLink`,
                { heading, url, userId: user?._id }
            );

            if (data.success) {
                toast.success("Link added successfully");
                setHeading("");
                setUrl("");
                fetchYTLinks();
            } else {
                toast.warn(data.message || "Could not add link");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteLink = (linkId) => {
        setLinkToDelete(linkId);
        setDeleteModalOpen(true);
    };

    const handleDeleteLink = async () => {
        if (!linkToDelete) return;

        try {
            const { data } = await axios.delete(
                `${backendUrl}/api/subjects/${subjectId}/ytLinks/deleteLink/${linkToDelete}`,
                { data: { userId: user?._id } }
            );

            if (data.success) {
                toast.success("Link deleted successfully");
                setYTLinks((prev) => prev.filter((link) => link._id !== linkToDelete));
            } else {
                toast.warn(data.message || "Could not delete link");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setDeleteModalOpen(false);
            setLinkToDelete(null);
        }
    };

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

            <div className="flex flex-col md:flex-row items-center justify-between md:pr-20 py-2 gap-2 mb-6 rounded-2xl">
                <div>
                    <span className="text-purple-900/70 text-[1.5rem] uppercase font-bold">
                        {subject?.name || "Loading..."} :
                    </span>
                </div>
                {["yt", "docs", "notes"].map((tab) => (
                    <button
                        key={tab}
                        className={`h-10 px-1 rounded-t-md transition-all cursor-pointer ${activeTab === tab
                            ? "border-b-2 border-purple-900/70 text-purple-900/80 font-semibold text-[1.1rem]"
                            : "text-purple-900/60 font-semibold text-[1.1rem]"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "yt" && "Saved videos"}
                        {tab === "docs" && "Saved documents"}
                        {tab === "notes" && "Notes"}
                    </button>
                ))}
            </div>

            {activeTab === "yt" && (
                <section>
                    <div className="flex flex-col gap-3 md:flex-row items-center mb-4">
                        <p className="text-purple-900/50 text-[1.05rem] md:mr-10">Add youtube video links here: </p>
                        <input
                            type="text"
                            placeholder="Heading"
                            className="bg-purple-100 h-10 w-[100%] md:w-[30%] outline-none p-5 rounded-md"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        <input
                            type="url"
                            placeholder="YouTube URL"
                            className="bg-purple-100 h-10 w-[100%] md:w-[30%] outline-none p-5 rounded-md"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button
                            disabled={loading}
                            className="h-10 w-[100%] md:w-20 bg-purple-100 border border-purple-900/70 text-purple-900/80 font-semibold flex items-center justify-center rounded-md cursor-pointer disabled:opacity-50"
                            onClick={handleAddLink}
                        >
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>

                    {ytLinks.length === 0 ? (
                        <div className="h-[70vh] flex flex-col justify-center items-center">
                            <p className="text-gray-400">No YouTube links available.</p>
                            <img src={no_data_icon2} alt="" className="h-[90%] opacity-90"/>
                        </div>
                    ) : (
                        <ul>
                            {ytLinks.map((res) => (
                                <li
                                    key={res._id}
                                    className="mb-3 p-3 bg-purple-50 rounded-lg shadow-sm flex justify-between items-center"
                                >
                                    <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-700 underline"
                                    >
                                        {res.heading}
                                    </a>
                                    <button
                                        onClick={() => confirmDeleteLink(res._id)}
                                    >
                                        <img src={delete_icon} alt="" className="h-7 cursor-pointer opacity-60" />
                                    </button>
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

            {/* Confirm Delete Modal */}
            <ConfirmDelete
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteLink}
                title="Delete Link"
                message="Are you sure you want to delete this YouTube link? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
};

export default Resources;
