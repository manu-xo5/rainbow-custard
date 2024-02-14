import { Note } from "@/lib/api";
import { ShareIcon, SquarePen, Trash2Icon } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

export const NotePage: React.FC = () => {
  const { state: noteValue } = useLocation();
  const { id: folderId, noteId } = useParams();

  return (
    <div className="col-span-2 flex flex-col " key={noteId}>
      <div className="h-10 flex items-center pl-1 pr-4 justify-between">
        <span>
          <button
            className="box-content p-1 hover:bg-secondary rounded"
            onClick={() =>
              Note.deleteNotes({ selected_notes: [noteId!], folder_id: folderId! })
            }
          >
            <Trash2Icon size="1em" />
          </button>
        </span>

        <span className="flex items-center gap-1 *:rounded">
          <button
            className="box-content p-1 hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none"
            disabled
          >
            <ShareIcon size="1em" />
          </button>

          <button
            className="box-content p-1 hover:bg-secondary"
            onClick={() => Note.addNote({ folder_id: folderId! })}
          >
            <SquarePen size="1em" />
          </button>
        </span>
      </div>

      <textarea
        className="bg-transparent outline-none p-5 flex-1"
        autoFocus
        defaultValue={noteValue}
        onChange={(e) => {
          const value = e.currentTarget.value;
          Note.updateNote({
            folderId: folderId!,
            id: noteId!,
            note: value,
          });
        }}
      />
    </div>
  );
};
