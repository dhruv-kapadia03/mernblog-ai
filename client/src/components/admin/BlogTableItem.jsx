import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { axios } = useAppContext();
    
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt);

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const deleteBlog = async () => {
        try {
            setDeleting(true);
            const { data } = await axios.post('/api/blog/delete', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeleting(false);
            setShowDeletePopup(false);
        }
    };

    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/blog/togglepublish', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Popup modal for confirming blog delete
    const deletePopup = showDeletePopup
        ? createPortal(
            <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-30 backdrop-blur-xs z-50">
                <div className="bg-white border rounded-xl shadow-lg p-6 w-80 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Delete Blog
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete this blog?
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={deleteBlog}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition-all disabled:opacity-60 cursor-pointer"
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                            onClick={() => setShowDeletePopup(false)}
                            className="border border-gray-400 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )
    : null;

    return (
        <>
            <tr className="border-y border-gray-300">
                <th className="px-2 py-4">{index}</th>
                <td className="px-2 py-4">{title}</td>
                <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
                <td className="px-2 py-4 max-sm:hidden">
                    <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>
                        {blog.isPublished ? 'Published' : 'Unpublished'}
                    </p>
                </td>
                <td className="px-2 py-4 flex text-xs gap-3">
                    <button
                        onClick={togglePublish}
                        className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
                    >
                        {blog.isPublished ? 'Unpublished' : 'Published'}
                    </button>
                    <img
                        src={assets.cross_icon}
                        className="w-8 hover:scale-110 transition-all cursor-pointer"
                        alt=""
                        onClick={() => setShowDeletePopup(true)}
                    />
                </td>
            </tr>
            {deletePopup}
        </>
    );
};

export default BlogTableItem;
