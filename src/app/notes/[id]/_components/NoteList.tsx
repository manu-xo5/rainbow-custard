import { queryClient } from "@/components/RootLayout";
import AddIcon from "@/components/icons/AddIcon";
import { Note } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NoteList: React.FC = () => {
  const { id: selectedId, noteId } = useParams();
  const $note = useQuery({
    queryKey: ["notes", selectedId],
    queryFn: () => Note.getNotes(selectedId!),
    enabled: !!selectedId,
  });
  const $newNote = useMutation({
    mutationKey: ["notes", selectedId],
    mutationFn: () => Note.addNote({ folder_id: selectedId! }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notes", selectedId] }),
  });
  const notes = $note.data;
  console.log(notes);
  const navigate = useNavigate();

  return (
    <div>
      {notes == null || !Array.isArray(notes) ? null : notes.length === 0 ? (
        <div className="text-center">
          <button
            className="text-muted-foreground inline-flex items-center gap-2 justify-center py-1.5 my-1.5 hover:text-secondary-foreground cursor-default"
            onClick={() => $newNote.mutate()}
          >
            <AddIcon />
            <span className="pb-0.5">add new note</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col p-2">
          {notes.map((note) => (
            <button
              key={note.id}
              className={cn(
                "block rounded-lg hover:bg-primary/75 w-full px-3 pt-1 pb-1.5 text-left capitalize min-w-0",
                "data-note-btn",
                note.id === noteId && "bg-primary",
              )}
              onClick={() => navigate(note.id, { state: note.note })}
            >
              <span className="block truncate">
                {(note.note || "New Note").substring(0, 40)}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {(
                  note.note?.split("\n")[1] || "\n no additional text"
                ).substring(0, 40)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
