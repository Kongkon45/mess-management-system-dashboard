import { Suspense } from "react";

import VerifyOtpForm from "./_components/verify-otp-form";

const VerifyOtpPage = () => {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
};

export default VerifyOtpPage;
