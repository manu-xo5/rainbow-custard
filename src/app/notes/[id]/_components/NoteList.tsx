import Loader from "@/components/icons/Loader";
import { Note } from "@/lib/api";
import { cn } from "@/lib/utils";
import { DocumentData } from "firebase/firestore";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NoteList: React.FC = () => {
  const { id: selectedId, noteId } = useParams();
  const [notes, setNotes] = React.useState<DocumentData[] | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedId) Note.getNotes(selectedId).then(setNotes);
  }, [selectedId]);

  return (
    <div>
      {notes == null || !Array.isArray(notes) ? (
        <Loader className="text-white animate-spin" />
      ) : (
        <div className="flex flex-col p-2">
          {notes.map((note) => (
            <button
              key={note.id}
              className={cn(
                "block rounded-lg hover:bg-primary/75 w-full px-3 pt-1 pb-1.5 text-left capitalize truncate min-w-0",
                note.id === noteId && "bg-primary",
              )}
              onClick={() => navigate(note.id, { state: note.note })}
            >
              {note.note.substring(0, 40)}...
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
