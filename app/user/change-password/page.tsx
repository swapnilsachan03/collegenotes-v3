"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import SolidButton from "@/app/components/buttons/SolidButton";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const submitHandler = (e: Event) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-0 h-[95vh] items-center justify-center gap-10">
      <h1 className="text-2xl lg:text-3xl font-roboto_condensed font-bold">
        Change Password
      </h1>

      <form
        className="flex flex-col gap-7 w-64 lg:w-72"
        onSubmit={() => submitHandler}
      >
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-semibold">Old password</label>
          <Input
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            required={true}
            color="teal"
            onChange={setOldPassword}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-semibold">New password</label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            required={true}
            color="teal"
            onChange={setNewPassword}
          />
        </div>

        <SolidButton
          color="teal"
          label="Update"
          onClick={(e: any) => submitHandler(e)}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
