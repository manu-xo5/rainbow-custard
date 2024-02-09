import { NoteList } from "./_components/NoteList";

export const NotesPage: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <div className="border-r">
        <NoteList />
      </div>

      {children}
    </>
  );
};
