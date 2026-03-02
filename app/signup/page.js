"use client";

import { Suspense } from "react";
import SignupInner from "./signup-inner";

export default function SignupPage(){
  return (
    <Suspense>
      <SignupInner/>
    </Suspense>
  );
}
