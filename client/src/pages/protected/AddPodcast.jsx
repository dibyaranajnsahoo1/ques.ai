

import React, { useState } from "react";
import UploadBox from "../../components/Upload/UploadBox";
import ModalBox from "../../components/common/ModalBox";
import UploadContent from "../../components/Upload/AddPodcastContent";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import UploadNavBar from "../../components/common/UploadNavBar";
import { useDispatch, useSelector } from "react-redux";
import { addOpenModal } from "../../redux/slice";
import {
    useCreateTranscriptMutation,
    useGetProjectByIdQuery,
    useGetTranscriptsQuery,
} from "../../redux/service";
import { Spinner } from "../../components/common/Spinner";
import TsTable from "../../components/Upload/YourFileTable";

import rssIcon from "../../assets/rss.png";
import ytIcon from "../../assets/yt.png";
import upl from "../../assets/uplod.png";

const Upload = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { openModal } = useSelector((state) => state.service);

    const { data: projectData } = useGetProjectByIdQuery(projectId);
    const [createTranscript] = useCreateTranscriptMutation();
    const { data: transcriptsData, isLoading } = useGetTranscriptsQuery(projectId);

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedText, setSelectedText] = useState(null);

    const uploadMethods = [
        {
            platform: "Rss Feed",
            icon: rssIcon,
            text: "RSS Feed",
            description: "Lorem ipsum dolor sit. Dolor lorem sit.",
        },
        {
            platform: "youtube",
            icon: ytIcon,
            text: "YouTube Video",
            description: "Lorem ipsum dolor sit. Dolor lorem sit.",
        },
        {
            platform: "Upload Files",
            icon: upl,
            text: "Upload Files",
            description: "Lorem ipsum dolor sit. Dolor lorem sit.",
        },
    ];

    const displayMethods =
        transcriptsData?.data?.length > 0 ? uploadMethods.slice(0, 3) : uploadMethods;

    const handleMethodClick = (icon, text) => {
        setSelectedIcon(icon);
        setSelectedText(text);
        dispatch(addOpenModal(true));
    };

    const handleUpdate = async (data) => {
        try {
            const { name, link } = data;
            await createTranscript({
                projectId,
                data: { fileName: name, fileDescription: link },
            }).unwrap();
            toast.success("Upload success");
            dispatch(addOpenModal(false));
        } catch (error) {
            toast.error("Upload Failed! Try again later");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#f9f9f9] px-4 sm:px-6 md:px-8 pb-8">
            {/* Navigation section */}
            <UploadNavBar
                projectName={projectData?.data?.name}
                pageName="Add your podcast"
            />

            {/* Modal */}
            <ModalBox isOpen={openModal}>
                <UploadContent
                    icon={selectedIcon}
                    text={selectedText}
                    onClose={() => dispatch(addOpenModal(false))}
                    onUpdate={handleUpdate}
                />
            </ModalBox>

            {/* Main Content */}
            <div className="w-full flex justify-start items-center">
                <div className="w-full md:w-11/12 my-4 ml-1">
                    <h1 className="font-bold text-2xl sm:text-3xl font-roboto text-black">
                        Add Podcast
                    </h1>

                    <div className="py-5 mt-4 flex flex-wrap justify-between gap-3">
                        {displayMethods && displayMethods.length > 0 ? (
                            displayMethods.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        handleMethodClick(item.icon, item.text)
                                    }
                                    className="w-full sm:w-[48%] lg:w-[30%] shadow-lg h-24 sm:h-28 lg:h-32 flex items-center rounded-md border-2 mb-3 cursor-pointer"
                                >
                                    <div className="flex w-full p-6 justify-between items-center rounded-md">
                                        <div className="flex flex-col justify-start w-3/4">
                                            <h1 className="font-roboto font-semibold text-sm sm:text-md lg:text-xl">
                                                {item.text}
                                            </h1>
                                            <p className="text-xs sm:text-sm font-roboto text-[#6e6e6e]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div
                                            className={`w-9 sm:w-12 lg:w-14 ${
                                                item.text === "Upload Files"
                                                    ? "bg-[#f3e8ff]"
                                                    : ""
                                            } rounded-md sm:rounded-xl min-h-9 sm:min-h-12 lg:min-h-14 flex justify-center items-center`}
                                        >
                                            <img
                                                src={item.icon}
                                                alt="Logo"
                                                className={
                                                    item.text === "Upload Files"
                                                        ? "w-5 sm:w-6 lg:w-8"
                                                        : "w-6 sm:w-8 lg:w-14"
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No Upload Methods Available</div>
                        )}
                    </div>

                    {transcriptsData?.data.length > 0 ? (
                        <div className="mt-2">
                            <TsTable />
                        </div>
                    ) : (
                        <div
                            onClick={() =>
                                handleMethodClick(
                                    uploadMethods[2].icon,
                                    uploadMethods[2].text
                                )
                            }
                            className="cursor-pointer"
                        >
                            <UploadBox />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;
