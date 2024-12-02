import { useEffect, useRef } from "react";

const useAutoResizeTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    
    if (textarea) {
      const computedStyle = window.getComputedStyle(textarea);
      const defaultMinHeight = parseFloat(computedStyle.minHeight);

      const resizeTextarea = () => {
        textarea.style.height = `${defaultMinHeight}px`;	
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", resizeTextarea);
      resizeTextarea();

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
      };
    }
  }, []);

  return textareaRef;
};

export default useAutoResizeTextarea;
