import * as React from "react";
import { FolderList } from "./_components/FolderList";
import { Folder } from "@/lib/api";
import { queryClient } from "@/components/RootLayout";
import { PlusIcon } from "lucide-react";

export const FoldersPage: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return (
    <main className="grid grid-cols-4 h-[100dvh]">
      <div className="border-r">
        <div className="px-4 h-10 flex items-center justify-start text-xl mb-2">
          <p className="text-primary-foreground font-bold">Memo</p>

          <div title="spacer" className="ml-auto" />

          <button
            type="button"
            className="hover:bg-muted box-content p-1 rounded transition-colors"
            onClick={async () => {
              Folder.createFolder({ title: "New Folder" });
              queryClient.invalidateQueries({ queryKey: ["folders"] });
            }}
          >
            <PlusIcon size="1em" />
          </button>
        </div>

        <FolderList />
      </div>
      {children}
    </main>
  );
};
