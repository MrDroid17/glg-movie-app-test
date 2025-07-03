import React from "react";
import { Movie } from "../../../../definitions/Movie";

// HOC that adds a badge to the image in the wrapped component
export function withMediaTypeBadge<T extends { movie: Movie }>(
    WrappedComponent: React.ComponentType<T>
) {
    return (props: T) => {
        const { movie } = props;
        const isMovie = movie.media_type === "movie";
        const badgeText = isMovie ? "Movie" : "TV Series";

        return (
            <div style={{ position: "relative", display: "inline-block" }}>
                <div
                    style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        background: isMovie ? "#1976d2" : "#388e3c",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: 12,
                        zIndex: 2,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        pointerEvents: "none"
                    }}
                >
                    {badgeText}
                </div>
                <WrappedComponent {...props} />
            </div>
        );
    };
}
