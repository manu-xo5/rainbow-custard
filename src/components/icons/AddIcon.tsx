import type { SVGProps } from "react";
import type { JSX } from "react/jsx-runtime";

export default function AddIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="8.5" x2="8.5" y2="9" stroke="currentColor"></line>
      <line x1="8.5" y1="10" x2="8.5" y2="17" stroke="currentColor"></line>
      <line y1="8.5" x2="17" y2="8.5" stroke="currentColor"></line>
    </svg>
  );
}
