// In der Datei types/react-table-config.d.ts
import "react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateTransaction?: (id: string, newData: Partial<TData>) => Promise<void>;
    deleteTransaction?: (id: string) => Promise<void>;
  }
}
