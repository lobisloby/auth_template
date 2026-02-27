"use client";

import { BeatLoader, HashLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { CheckCircle, XCircle } from "lucide-react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div
        className="
                flex items-center w-full justify-center 
              "
      >
        {!success && !error && 
            <BeatLoader color="#38bdf8"/>
        }
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm border shadow-sm bg-red-200 p-2 rounded-md mb-4">
            <XCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm border shadow-sm bg-green-200 p-2 rounded-md mb-4">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
