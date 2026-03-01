"use client";

import { Suspense } from "react";
import SignupInner from "./signupInner";

export default function Page(){
  return (
    <Suspense>
      <SignupInner/>
    </Suspense>
  );
}
