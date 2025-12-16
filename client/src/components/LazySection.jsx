// components/LazySection.jsx
import { useInView } from "react-intersection-observer";
import { Suspense, lazy, useMemo } from "react";

export default function LazySection({ importFunc, fallback = null }) {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    });

    // Evita recrear el componente lazy en cada render
    const LazyComponent = useMemo(() => lazy(importFunc), [importFunc]);

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
