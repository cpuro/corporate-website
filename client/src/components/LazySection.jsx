// components/LazySection.jsx
import { useInView } from "react-intersection-observer";
import { Suspense, lazy } from "react";

export default function LazySection({ importFunc, fallback = null }) {
const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
const LazyComponent = lazy(importFunc);

return (
<div ref={ref}>
    {inView && (
    <Suspense fallback={fallback}>
        <LazyComponent />
    </Suspense>
    )}
</div>
);
}
