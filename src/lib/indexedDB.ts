// IndexedDB 工具类，用于存储大文件

const DB_NAME = 'XingtongfengyuDB';
const DB_VERSION = 1;
const VIDEO_STORE = 'videos';
const DOCUMENT_STORE = 'documents';

export interface StoredVideo {
  id: number;
  title: string;
  description: string;
  videoBlob?: Blob;
  thumbnailBlob?: Blob;
  author?: string;
  duration?: string;
  views?: number;
  createdAt?: Date;
}

export interface StoredDocument {
  id: number;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  documentBlob?: Blob;
  createdAt?: Date;
}

class IndexedDBService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 创建视频存储
        if (!db.objectStoreNames.contains(VIDEO_STORE)) {
          const videoStore = db.createObjectStore(VIDEO_STORE, { keyPath: 'id' });
          videoStore.createIndex('title', 'title', { unique: false });
        }

        // 创建文档存储
        if (!db.objectStoreNames.contains(DOCUMENT_STORE)) {
          const docStore = db.createObjectStore(DOCUMENT_STORE, { keyPath: 'id' });
          docStore.createIndex('title', 'title', { unique: false });
        }
      };
    });
  }

  // 视频操作
  async saveVideo(video: StoredVideo): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([VIDEO_STORE], 'readwrite');
      const store = transaction.objectStore(VIDEO_STORE);
      const request = store.put(video);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getVideo(id: number): Promise<StoredVideo | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([VIDEO_STORE], 'readonly');
      const store = transaction.objectStore(VIDEO_STORE);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllVideos(): Promise<StoredVideo[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([VIDEO_STORE], 'readonly');
      const store = transaction.objectStore(VIDEO_STORE);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteVideo(id: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([VIDEO_STORE], 'readwrite');
      const store = transaction.objectStore(VIDEO_STORE);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  // 文档操作
  async saveDocument(doc: StoredDocument): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([DOCUMENT_STORE], 'readwrite');
      const store = transaction.objectStore(DOCUMENT_STORE);
      const request = store.put(doc);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getDocument(id: number): Promise<StoredDocument | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([DOCUMENT_STORE], 'readonly');
      const store = transaction.objectStore(DOCUMENT_STORE);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllDocuments(): Promise<StoredDocument[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([DOCUMENT_STORE], 'readonly');
      const store = transaction.objectStore(DOCUMENT_STORE);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteDocument(id: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([DOCUMENT_STORE], 'readwrite');
      const store = transaction.objectStore(DOCUMENT_STORE);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const indexedDBService = new IndexedDBService();
