import useSWR from 'swr';
import { fetcher } from '@/lib/api';

export default function useApi<T>(url: string | null, refresh?: number) {
  return useSWR<T>(url, fetcher, { refreshInterval: refresh });
}
