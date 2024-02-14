import * as React from "react";
import Loader from "@/components/icons/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Folder, TFolder } from "@/lib/api";
import { FolderClosedIcon, Trash2Icon } from "lucide-react";
import { queryClient } from "@/components/RootLayout";

export const FolderList: React.FC = () => {
  const $folder = useQuery<TFolder[]>({
    queryKey: ["folders"],
    queryFn: () => Folder.getAll(),
  });
  const data = $folder.data ?? [];
  const navigate = useNavigate();
  const { id: selectedNote } = useParams();

  React.useEffect(() => {
    (async () => {
      const data = await Folder.getAll();

      if (!selectedNote) {
        navigate(data[0].id, { replace: true });
        console.log(data[0].id);
      }
    })();
  }, [navigate, selectedNote]);

  return (
    <div>
      {data === null ? (
        <div className="h-[calc(100vh-var(--app-bar))] grid place-items-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col p-2">
          {data.map(({ id, title }) => (
            <button
              key={id}
              className={cn(
                "group flex items-center cursor-default rounded-lg hover:bg-primary/75 w-full px-3 pt-1 pb-1.5 text-left capitalize min-w-0",
                selectedNote === id && "!bg-primary",
              )}
              type="button"
              onClick={() => navigate("/notes/" + id)}
            >
              <span className="flex flex-1 min-w-0 items-center gap-2">
                <FolderClosedIcon size="1em" className="shrink-0" />
                <span className="block truncate">{title}</span>
              </span>

              <button
                className="group-hover:opacity-100 opacity-0 bg-secondary box-content p-1 rounded transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  Folder.deleteFolders({ folderList: [id] });
                  queryClient.invalidateQueries({ queryKey: ["folders"] });
                }}
              >
                <Trash2Icon size={"0.8em"} />
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
