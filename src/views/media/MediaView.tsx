import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import { useErrorHandler } from "../../hooks/useErrorHandler";

import { useStores } from "../../hooks/useStores";
import { Movie } from "../../definitions/Movie";
import { MediaController } from "./MediaController";

import { MediaComponent } from "./components/media/MediaComponent";
import { MediaComponentSkeleton } from "./components/media/MediaComponentSkeleton";
import { withMediaTypeBadge } from "./components/media/withMediaTypeBadge";

import "./Media.scss";

export const MediaView = observer(() => {
  const { mediaStore } = useStores();
  const { media } = mediaStore;
  const [contentType, setContentType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const mediaController = new MediaController(mediaStore);
  const { showError, SnackbarAlert } = useErrorHandler();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await mediaController.getAll();
      } catch (err: any) {
        showError("Failed to load media");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNav = async (type: string) => {
    setContentType(type);
    setLoading(true);
    try {
      switch (type) {
        case "all":
          await mediaController.getAll();
          break;
        case "movies":
          await mediaController.getMovies();
          break;
        case "tv":
          await mediaController.getTv();
          break;
        default:
          showError(`Unknown type ${type}.`);
      }
    } catch (err: any) {
      showError(err?.message || "Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const MediaComponentWithBadge = withMediaTypeBadge(MediaComponent);

  return (
    <div>
      <SnackbarAlert />
      <div className="navigation">
        <Button
          size="small"
          variant="text"
          className={contentType === "all" ? "selected" : undefined}
          onClick={() => handleNav("all")}
        >
          All
        </Button>
        <Button
          size="small"
          variant="text"
          className={contentType === "movies" ? "selected" : undefined}
          onClick={() => handleNav("movies")}
        >
          Movies
        </Button>
        <Button
          size="small"
          variant="text"
          className={contentType === "tv" ? "selected" : undefined}
          onClick={() => handleNav("tv")}
        >
          TV Shows
        </Button>
      </div>
      <div id="media">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <MediaComponentSkeleton key={i} />)
          : media.map((m: Movie, i) => <MediaComponentWithBadge movie={m} key={i} />)
        }
      </div>
    </div>
  );
});

export default MediaView;
