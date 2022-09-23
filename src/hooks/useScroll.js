import { useEffect, useState } from "react";
import normalizeBetweenTwoRanges from "./utils";

export default function useWindowPosition() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    function updatePosition() {
      const container = document.body;
      const containerStart = container.offsetTop;
      const containerEnd = containerStart + container.offsetHeight;
      const currentScrollPos = window.pageYOffset;
      const normalizedValue = normalizeBetweenTwoRanges(
        currentScrollPos >= 0 ? currentScrollPos : 0,
        containerStart,
        containerEnd,
        0,
        (containerEnd / 100) * 2
      );
      setValue(normalizedValue);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return { value };
}
