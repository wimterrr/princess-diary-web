const DB_NAME = "princess-diary-web";
const STORE_NAME = "save-slots";
const SAVE_KEY = "slot-1";

import { restoreSavedState } from "../state/restoreState.js";

export class InvalidSaveError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidSaveError";
  }
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
  });
}

export async function loadSave() {
  const db = await openDb();
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(SAVE_KEY);

    request.onsuccess = () => {
      if (!request.result) {
        resolve(null);
        return;
      }

      const restoredState = restoreSavedState(request.result);
      if (!restoredState) {
        reject(new InvalidSaveError("Saved run does not match the fixed three-week contract."));
        return;
      }

      resolve(restoredState);
    };
    request.onerror = () => reject(request.error ?? new Error("Failed to load save"));
  });
}

export async function writeSave(state) {
  const db = await openDb();
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Failed to write save"));
    tx.objectStore(STORE_NAME).put(state, SAVE_KEY);
  });
}

export async function clearSave() {
  const db = await openDb();
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Failed to clear save"));
    tx.objectStore(STORE_NAME).delete(SAVE_KEY);
  });
}
