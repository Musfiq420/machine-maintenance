import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../context/userProvider";
import DashboardLoading from "../dashboard/dashboardLoading";
import {  MdDelete  } from "react-icons/md";

export default function DeleteModal({
  url,
  data_type,
  hasAccess,
  setSuccess,
  success = null,
}) {
  const { getToken } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    const token = getToken();
    setLoading(true);
    await fetch(url, {
      method: "DELETE",
      Authorization: `Token ${token}`, // Ensure this header matches what your server expects
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.text();
          console.log("error", error);
        }
        return fetch(url);
      })
      .then((res) => res.json())

      .catch((error) => {
        console.log(error);
      });
    if (success !== null) {
      setSuccess(true);
      setLoading(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {hasAccess && (
        <div>
          <button
            className="px-2 py-2 font-semibold  w-fit text-white h-fit bg-red-600 rounded-md"
            onClick={() => setOpenModal(true)}
          >
            <MdDelete />
          </button>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="sm"
            fullWidth
          >
            {!loading ? (
              <>
                <DialogTitle>Delete {data_type}</DialogTitle>
                <DialogContent>
                  <>Are You Sure You Want To Delete this {data_type}?</>
                  <div className=" flex justify-end items-center gap-8">
                    <button
                      className="text-primary font-semibold px-8 py-4 "
                      onClick={() => setOpenModal(false)}
                      variant="text"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-12 py-3 font-semibold "
                    >
                      Delete
                    </button>
                  </div>
                </DialogContent>
              </>
            ) : (
              <DashboardLoading />
            )}
          </Dialog>
        </div>
      )}
    </>
  );
}
