import { Suspense } from "react";
import SignupInner from "./signup-inner";

export default function Page() {
  return (
    <Suspense fallback={<div style={{color:"white",padding:40}}>Loading...</div>}>
      <SignupInner />
    </Suspense>
  );
}
