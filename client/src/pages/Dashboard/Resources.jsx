import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import ConfirmDelete from "../../components/ConfirmDelete";
import delete_icon from '../../assets/delete-icon.png';
import yt_icon from '../../assets/yt-icon.jpg';
import no_data_icon2 from '../../assets/no-data-icon2.jpg';
import yt_logo3 from '../../assets/yt-logo3.png';
import ResourceDropdown from "../../components/ResourceDropdown";
import home_icon from '../../assets/home-icon.png'

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

    const isValidYouTubeUrl = (url) => {
        const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return ytRegex.test(url);
    };

    const handleAddLink = async () => {
        if (!isValidYouTubeUrl(url)) {
            toast.warn("Please enter a valid YouTube URL");
            return;
        }
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

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const navigate = useNavigate()

    return (
        <div className="px-5 md:px-10 pt-5">

            {/* Subject Name + Dropdown */}
            <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-2 mb-6 rounded-2xl">
                <div>
                    <span className="text-purple-900/80 text-[1.5rem] uppercase font-bold">
                        {subject?.name || "Loading..."} :
                    </span>
                </div>
                <div className="flex gap-5">
                    <ResourceDropdown
                    selectedResource={activeTab}
                    setSelectedResource={setActiveTab}
                />
                {!isMobile &&
                <button className='cursor-pointer transition-all duration-300 hover:scale-[1.02]' onClick={() => navigate('/')}>
                    <img src={home_icon} alt="" className='h-8 opacity-30' />
                </button>}
                </div>
            </div>

            {/* YouTube Links */}
            {activeTab === "yt" && (
                <section>
                    <div className="flex flex-col gap-3 md:flex-row items-center mb-4">
                        <p className="text-purple-900/50 text-[1.05rem] md:mr-10">
                            Add YouTube video links here:
                        </p>
                        <input
                            type="text"
                            placeholder="Heading"
                            className="bg-purple-100 h-10 text-purple-900 w-[100%] md:w-[30%] outline-none p-5 rounded-md"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        <input
                            type="url"
                            placeholder="YouTube URL"
                            className="bg-purple-100 h-10 text-purple-900 w-[100%] md:w-[30%] outline-none p-5 rounded-md"
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
                            <img src={no_data_icon2} alt="" className="h-[90%] opacity-90" />
                        </div>
                    ) : (
                        <ul>
                            {ytLinks.map((res, index) => (
                                <li
                                    key={res._id}
                                    className="mb-3 p-1 bg-purple-50 rounded-lg shadow-sm flex justify-between items-center"
                                >
                                    <p className="text-purple-900/80 font-semibold w-[50%] text-[1.15rem]">
                                        <span>{index + 1}.</span> {res.heading}
                                    </p>
                                    <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex gap-2 items-center transition-all duration-300 hover:scale-[1.01] cursor-pointer hover:underline text-purple-900/80"
                                    >
                                        <span className="text-purple-900/80 text-[0.9rem]">
                                            Video Link :
                                        </span>
                                        <img src={yt_logo3} alt="" className="h-10" />
                                    </a>
                                    <button onClick={() => confirmDeleteLink(res._id)}>
                                        <img src={delete_icon} alt="" className="h-7 cursor-pointer opacity-60" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}

            {/* Notes */}
            {activeTab === "notes" && (
                <section>
                    <p className="text-gray-500">Notes section coming soon.</p>
                </section>
            )}

            {/* Documents */}
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
