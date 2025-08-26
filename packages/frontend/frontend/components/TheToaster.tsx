import React from "react";
import { Toaster } from "react-hot-toast";

export default function TheToaster() {
  return (
    <Toaster
      position="bottom-left"
      containerStyle={{
        zIndex: "9999999 !important",
      }}
      toastOptions={{
        style: {
          zIndex: "9999999 !important",
        },
      }}
    />
  );
}
