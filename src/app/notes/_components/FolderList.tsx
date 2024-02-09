import * as React from "react";
import Loader from "@/components/icons/Loader";
import { DocumentData } from "firebase/firestore";
import { Folder } from "@/lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const __data = `[{"id":"CxsM8WDSf4c48tSSZHWe","title":"todo"},{"id":"Ti9gijiGLRI5llqM2r5g","accentColor":"#000000","title":"plans & new feature","icon":"😄"},{"id":"WlGXKJDpDJyQtR7SABCv","icon":"😄","accentColor":"#000000","title":"idea"},{"id":"eJkeJOu9LHplhezUvek6","title":"bugs","icon":"😄","accentColor":"#000000"},{"id":"m0nuOw1296dNqjr0HvHU","accentColor":"#c03d00","title":"crop curry","icon":"🚿"},{"id":"oLbYyX1XOVztLe3tKeeT","title":"cabi"},{"id":"tkNQTb8Bjbgo45OHkNG6","title":"sorted wallet"},{"id":"vkQQztYrvLHmlatn1d9w","icon":"😘","title":"skin curry","accentColor":"#ff75a1"},{"id":"zsstBObktHWsNfP0ylyG","accentColor":"#5cc9ff","icon":"🎭","title":"Stoicism_ / "}]`;

export const FolderList: React.FC = () => {
  const [data, setData] = React.useState<DocumentData[] | null>(null);
  const navigate = useNavigate();
  const { id: selectedNote } = useParams();

  React.useEffect(() => {
    (async () => {
      const data = JSON.parse(__data); // await Folder.getAll();

      setData(data);
      if (!selectedNote) {
        navigate(data[0].id);
        console.log(data[0].id);
      }
    })();
  }, [navigate, selectedNote]);

  return (
    <>
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
                "block rounded-lg hover:bg-primary/75 w-full px-3 pt-1 pb-1.5 text-left capitalize",
                selectedNote === id && "!bg-primary",
              )}
              type="button"
              onClick={() => navigate("/notes/" + id)}
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
