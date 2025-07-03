import React from "react";
import "./MediaComponent.scss";

export const MediaComponentSkeleton = () => (
  <div className="movie-container">
    <div className="skeleton-image shimmer" />
    <div className="skeleton-title shimmer" />
    <div className="skeleton-date shimmer" />
  </div>
);
