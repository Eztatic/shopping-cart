import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useFetchProducts } from '/src/components/useFetchProducts.jsx';

describe('useFetchProducts hook', () => {
      beforeEach(() => {
            globalThis.fetch = vi.fn();
      });

      afterEach(() => {
            vi.restoreAllMocks();
      });

      it('should return the states default values', () => {
            const { result } = renderHook(() => useFetchProducts());

            expect(result.current.loading).toBe(true);
            expect(result.current.products).toEqual([]);
            expect(result.current.error).toBeNull();
      });

      it('should fetch products successfully', async () => {
            const mockProducts = [{ id: 1, title: 'Test Product' }];

            globalThis.fetch.mockResolvedValueOnce({
                  ok: true,
                  json: () => Promise.resolve(mockProducts),
            });

            const { result } = renderHook(() => useFetchProducts());

            await waitFor(() => {
                  expect(result.current.loading).toBe(false);
            });

            expect(result.current.products).toEqual(mockProducts);
            expect(result.current.error).toBeNull();
      });

      it('should handle errors correctly', async () => {
            const mockError = new Error('Server Error');

            globalThis.fetch.mockRejectedValueOnce(mockError);

            const { result } = renderHook(() => useFetchProducts());

            await waitFor(() => {
                  expect(result.current.loading).toBe(false);
            });

            expect(result.current.products).toEqual([]);
            expect(result.current.error).toBe(mockError);
      });

      it('should cancel the fetch on unmount', async () => {
            const controllerAbortSpy = vi.spyOn(AbortController.prototype, 'abort');
            const mockProducts = [{ id: 1, title: 'Test Product' }];

            globalThis.fetch.mockResolvedValueOnce({
                  ok: true,
                  json: () => Promise.resolve(mockProducts),
            });

            const { unmount } = renderHook(() => useFetchProducts());

            unmount();

            expect(controllerAbortSpy).toHaveBeenCalled();
      });
});
