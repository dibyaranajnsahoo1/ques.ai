import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Subscription from "../../components/Settings/Subscription";
import { Spinner } from "../../components/common/Spinner";
import UploadNavBar from "../../components/common/UploadNavBar";
import {
  useMyInfoQuery,
  useUpdateInfoMutation,
  useUpdateProfilePicMutation,
} from "../../redux/service";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(true);

  const { data, isLoading, refetch } = useMyInfoQuery();
  const [updateProfilePic] = useUpdateProfilePicMutation();
  const [updateInfo] = useUpdateInfoMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProfilePic(data?.me?.profilePic || null);
      setUsername(data?.me?.userName || "");
      setEmail(data?.me?.email || "");
      setLoadingProfilePic(false);
    }
  }, [data]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("media", file);

      toast.promise(updateProfilePic(formData), {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
        error: "Failed to update profile",
      });
      await refetch();
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!username) {
      toast.error("Username cannot be empty.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("text", username);

    toast.promise(updateInfo(formData), {
      loading: "Saving changes...",
      success: "Profile updated successfully!",
      error: "Failed to update profile",
    });
    await refetch();
    setIsSubmitting(false);
  };

  return (
    <div className="w-full p-4 md:p-8 bg-white rounded-md shadow-md">
      <UploadNavBar projectName="Settings" pageName="Account Settings" />

      <div className="my-6 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-roboto">
          Account Settings
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-28 h-28 rounded-full overflow-hidden group shadow-md">
            {loadingProfilePic ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <Spinner />
              </div>
            ) : profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center text-white text-3xl font-bold ${
                  Math.random() > 0.5 ? "bg-primary" : "bg-orange-500"
                }`}
              >
                {data?.me?.userName
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Upload color="white" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
                😊 Click on your profile to {profilePic ? "change" : "set"} your image
            </p>

        </div>

        {/* Info Inputs */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">
                🧑 Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter username"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">
                🔐 Email
            </label>

            <input
              type="text"
              value={email}
              readOnly
              className="p-3 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-primary text-white font-semibold text-sm rounded hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
                💾 {isSubmitting ? "Saving..." : "Save Settings"}
            </button>

        </div>
      </div>

      {/* Subscription */}
      <div className="mt-12">
        <Subscription />
      </div>
    </div>
  );
};

export default AccountSettings;
