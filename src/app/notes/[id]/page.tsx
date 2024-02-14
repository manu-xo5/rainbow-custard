import { useParams } from "react-router-dom";
import { NoteList } from "./_components/NoteList";
import { PlaceholderNote } from "./_components/PlaceholderNote";
import { SearchIcon } from "lucide-react";

export const NotesPage: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { noteId } = useParams();

  return (
    <>
      <div className="border-r">
        <p className="py-2 text-lg px-4 font-bold h-10 mb-2">Notes</p>

        <div className="flex items-center px-2 pt-2">
          <div className="focus-within:bg-muted flex-1 flex items-center gap-x-2 rounded-lg px-2 py-1">
            <SearchIcon size="1em" color="currentColor" />

            <input
              className="bg-transparent w-full outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        <NoteList />
      </div>

      {noteId ? children : <PlaceholderNote />}
    </>
  );
};
