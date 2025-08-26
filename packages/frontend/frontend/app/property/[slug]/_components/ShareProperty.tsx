"use client";

import React from "react";
import toast from "react-hot-toast";

const ShareProperty = () => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-500 text-white"
      onClick={() => {
        navigator.clipboard
          .writeText(typeof window !== "undefined" ? window.location.href : "")
          .then(
            () => {
              toast.dismiss();
              toast.success("Link copied", { position: "bottom-left" });
              // setShareModalOpen(false);
            },
            () => {
              toast.error("Unable to copy", { position: "bottom-left" });
            }
          );
      }}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      Share
    </button>
  );
};

export default ShareProperty;
