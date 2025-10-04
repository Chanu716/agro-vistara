import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface AgroVistaraDB extends DBSchema {
  'farms': {
    key: string;
    value: {
      id: string;
      user_id: string;
      name: string;
      location: string;
      total_area_acres: number;
      soil_type?: string;
      water_source?: string;
      created_at: string;
      updated_at: string;
    };
    indexes: { 'by-user': string };
  };
  'crop-records': {
    key: string;
    value: {
      id: string;
      farm_id: string;
      user_id: string;
      crop_name: string;
      crop_type: string;
      area_acres: number;
      planting_date: string;
      expected_harvest_date?: string;
      actual_harvest_date?: string;
      expected_yield_kg?: number;
      actual_yield_kg?: number;
      status: string;
      notes?: string;
      created_at: string;
      updated_at: string;
    };
    indexes: { 'by-user': string; 'by-farm': string };
  };
  'expenses': {
    key: string;
    value: {
      id: string;
      farm_id: string;
      crop_record_id?: string;
      user_id: string;
      expense_type: string;
      amount: number;
      description?: string;
      expense_date: string;
      created_at: string;
    };
    indexes: { 'by-user': string; 'by-crop': string };
  };
  'crop-recommendations': {
    key: string;
    value: {
      id: string;
      crop_name: string;
      best_season: string;
      suitable_soils?: string[];
      companion_crops?: string[];
      rotation_crops?: string[];
      planting_tips?: string;
      care_instructions?: string;
      avg_yield_per_acre?: number;
      market_price_range?: string;
      created_at: string;
    };
  };
  'pending-actions': {
    key: number;
    value: {
      id?: number;
      type: 'CREATE' | 'UPDATE' | 'DELETE';
      table: string;
      data: any;
      timestamp: number;
      url: string;
      method: string;
      headers: Record<string, string>;
    };
    indexes: { 'by-timestamp': number };
  };
}

let dbInstance: IDBPDatabase<AgroVistaraDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<AgroVistaraDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<AgroVistaraDB>('agro-vistara-offline', 1, {
    upgrade(db) {
      // Farms store
      if (!db.objectStoreNames.contains('farms')) {
        const farmsStore = db.createObjectStore('farms', { keyPath: 'id' });
        farmsStore.createIndex('by-user', 'user_id');
      }

      // Crop records store
      if (!db.objectStoreNames.contains('crop-records')) {
        const cropsStore = db.createObjectStore('crop-records', { keyPath: 'id' });
        cropsStore.createIndex('by-user', 'user_id');
        cropsStore.createIndex('by-farm', 'farm_id');
      }

      // Expenses store
      if (!db.objectStoreNames.contains('expenses')) {
        const expensesStore = db.createObjectStore('expenses', { keyPath: 'id' });
        expensesStore.createIndex('by-user', 'user_id');
        expensesStore.createIndex('by-crop', 'crop_record_id');
      }

      // Crop recommendations store
      if (!db.objectStoreNames.contains('crop-recommendations')) {
        db.createObjectStore('crop-recommendations', { keyPath: 'id' });
      }

      // Pending actions store (for offline sync)
      if (!db.objectStoreNames.contains('pending-actions')) {
        const pendingStore = db.createObjectStore('pending-actions', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        pendingStore.createIndex('by-timestamp', 'timestamp');
      }
    },
  });

  return dbInstance;
}

// Cache data from Supabase to IndexedDB
export async function cacheData<T extends keyof AgroVistaraDB>(
  storeName: T,
  data: AgroVistaraDB[T]['value'][]
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(storeName as any, 'readwrite');
  const store = tx.objectStore(storeName as any);

  for (const item of data) {
    await store.put(item as any);
  }

  await tx.done;
}

// Get cached data from IndexedDB
export async function getCachedData<T extends keyof AgroVistaraDB>(
  storeName: T,
  indexName?: string,
  indexValue?: any
): Promise<AgroVistaraDB[T]['value'][]> {
  const db = await getDB();
  const tx = db.transaction(storeName as any, 'readonly');
  const store = tx.objectStore(storeName as any);

  if (indexName && indexValue) {
    const index = (store as any).index(indexName);
    return await index.getAll(indexValue);
  }

  return await store.getAll();
}

// Add pending action for offline sync
export async function addPendingAction(
  type: 'CREATE' | 'UPDATE' | 'DELETE',
  table: string,
  data: any,
  url: string,
  method: string,
  headers: Record<string, string>
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('pending-actions', 'readwrite');
  const store = tx.objectStore('pending-actions');

  await store.add({
    type,
    table,
    data,
    timestamp: Date.now(),
    url,
    method,
    headers,
  });

  await tx.done;

  // Trigger background sync if available
  if ('serviceWorker' in navigator && 'sync' in (navigator as any).serviceWorker) {
    const registration = await navigator.serviceWorker.ready;
    await (registration as any).sync.register('sync-offline-data');
  }
}

// Get pending actions count
export async function getPendingActionsCount(): Promise<number> {
  const db = await getDB();
  const tx = db.transaction('pending-actions', 'readonly');
  const store = tx.objectStore('pending-actions');
  const count = await store.count();
  return count;
}

// Clear pending actions (after successful sync)
export async function clearPendingActions(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('pending-actions', 'readwrite');
  const store = tx.objectStore('pending-actions');
  await store.clear();
  await tx.done;
}

// Get all pending actions
export async function getPendingActions(): Promise<AgroVistaraDB['pending-actions']['value'][]> {
  const db = await getDB();
  const tx = db.transaction('pending-actions', 'readonly');
  const store = tx.objectStore('pending-actions');
  return await store.getAll();
}

// Delete a specific pending action
export async function deletePendingAction(id: number): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('pending-actions', 'readwrite');
  const store = tx.objectStore('pending-actions');
  await store.delete(id);
  await tx.done;
}
