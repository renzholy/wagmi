import type { Address } from 'abitype'
import { describe, expect, it } from 'vitest'

import { act, getSigners, renderHook } from '../../../test'
import { useDotbitName } from './useDotbitName'

describe('useDotbitName', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useDotbitName({ address: '0x1D643FAc9a463c9d544506006a6348c234dA485f' }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": "jeffx.bit",
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
        "isFetching": false,
        "isIdle": false,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `)
  })

  describe('configuration', () => {
    describe('address', () => {
      it('has name', async () => {
        const { result, waitFor } = renderHook(() =>
          useDotbitName({
            address: '0x1D643FAc9a463c9d544506006a6348c234dA485f',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "jeffx.bit",
            "error": null,
            "fetchStatus": "idle",
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isRefetching": false,
            "isSuccess": true,
            "refetch": [Function],
            "status": "success",
          }
        `)
      })

      it('invalid address', async () => {
        const { result, waitFor } = renderHook(() =>
          useDotbitName({
            address: '3QtUb3MfgJR7syviUzLgQiCrJFGmZ5bYJj' as any,
          }),
        )

        await waitFor(() => expect(result.current.isError).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: invalid address (argument="address", value="3QtUb3MfgJR7syviUzLgQiCrJFGmZ5bYJj", code=INVALID_ARGUMENT, version=address/5.7.0)],
            "fetchStatus": "idle",
            "isError": true,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isRefetching": false,
            "isSuccess": false,
            "refetch": [Function],
            "status": "error",
          }
        `)
      })

      it('does not have name', async () => {
        const address = (await getSigners()[0]?.getAddress()) as Address
        const { result, waitFor } = renderHook(() => useDotbitName({ address }))

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res.data).toMatchInlineSnapshot(`null`)
      })
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useDotbitName({
          address: '0x1D643FAc9a463c9d544506006a6348c234dA485f',
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": "jeffx.bit",
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() =>
        useDotbitName({
          address: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac',
          enabled: false,
        }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useDotbitName({
          address: '0x1D643FAc9a463c9d544506006a6348c234dA485f',
          enabled: false,
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`"jeffx.bit"`)
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when `address` is missing', async () => {
      const { result, waitFor } = renderHook(() => useDotbitName())

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })
  })
})
