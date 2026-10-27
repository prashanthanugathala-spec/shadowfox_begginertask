c "use client"

import SkeletonKeyPreloader from "./skeleton-key-preloader"

// Ink on black with a silver key and a 2.0 release, tailored for Prashanth's Frontend Portfolio.
export default function DemoNoir() {
  return (
    <SkeletonKeyPreloader
      loop
      paper="#0e0e0f"
      ink="#f1eee8"
      metal="silver"
      name="Prashanth"
      about={["frontend developer", "building interfaces", "that move."]}
      tags={["#frontend", "#react", "#javascript", "#motion"]}
      release="2.0"
      durationMs={5400}
    />
  )
}
