import {
  doc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

const notesCollectionFor = (folderId: string) =>
  collection(db, "folders", folderId, "notes");

export type TFolder = {
  id: string;
  title: string;
};

class Folder {
  static async getAll() {
    try {
      const qs = await getDocs(collection(db, "folders"));
      const folders = qs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(folders)
      return folders as TFolder[];
    } catch (err) {
      console.log("[service getFolders()]");
      console.error(err);
      return [];
    }
  }

  static async get(folderId: string) {
    try {
      const docRef = doc(collection(db, "folders"), folderId);
      const folder = await getDoc(docRef);
      return folder.data();
    } catch (err) {
      console.log("[service getFolders()]");
      console.error(err);
      return undefined;
    }
  }

  static async createFolder(body: { title: string }) {
    await addDoc(collection(db, "folders"), body);
  }

  static async updateFolder(body: { folderId: string; title: string }) {
    try {
      const docRef = doc(collection(db, "folders"), body.folderId);
      await setDoc(docRef, { title: body.title }, { merge: true });
    } catch {
      return;
    }
  }

  static async deleteFolders(body: { folderList: string[] }) {
    const docIdsToDelete = body.folderList;

    const batch = writeBatch(db);

    docIdsToDelete.forEach((docId) => {
      const docRef = doc(collection(db, "folders"), docId);

      batch.delete(docRef);
    });

    await batch.commit();
  }
}

export type TNote = {
  note: string;
  id: string;
};

class Note {
  static async getNotes(id: string) {
    const query = notesCollectionFor(id);
    const qs = await getDocs(query);
    return qs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TNote[];
  }

  static async updateNote({
    folderId,
    id,
    note,
  }: {
    folderId: string;
    id: string;
    note: string;
  }) {
    const query = notesCollectionFor(folderId);
    const noteRef = doc(query, id);
    await setDoc(noteRef, { note }, { merge: true });
  }

  static async addNote({ folder_id }: { folder_id: string }) {
    await addDoc(notesCollectionFor(folder_id), {});
  }

  static async deleteNotes(body: {
    folder_id: string;
    selected_notes: string[];
  }) {
    const docIdsToDelete = body.selected_notes;

    const batch = writeBatch(db);

    docIdsToDelete.forEach((docId) => {
      const docRef = doc(
        collection(db, "folders", String(body.folder_id), "notes"),
        docId,
      );
      batch.delete(docRef);
    });

    await batch.commit();
  }
}

export { Folder, Note };
