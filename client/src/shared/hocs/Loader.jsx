import React from "react";
import { Jelly } from "ldrs/react";
import "ldrs/react/Jelly.css";

export default function Loader({ children, isLoading }) {
  return isLoading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Jelly size="40" speed="0.9" color="pink" />
    </div>
  ) : (
    children
  );
}
