import * as React from "react";
import { FolderList } from "./_components/FolderList";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FoldersPage: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <main className="grid grid-cols-4">
      <ScrollArea className="h-[100dvh] pr-2 border-r" type="auto">
        <FolderList />
      </ScrollArea>
      {children }
    </main>
  );
};
