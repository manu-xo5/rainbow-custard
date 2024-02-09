import { Note } from "@/lib/api";
import { useLocation, useParams } from "react-router-dom";

export const NotePage: React.FC = () => {
  const { state: noteValue } = useLocation();
  const { id: folderId, noteId } = useParams();

  return (
    <div className="col-span-2 grid" key={noteId}>
      <textarea
        onChange={(e) => {
          const value = e.currentTarget.value;
          Note.updateNote({
            folderId: folderId!,
            id: noteId!,
            note: value,
          });
        }}
        className="bg-transparent outline-none p-2"
        defaultValue={noteValue}
      />
    </div>
  );
};
