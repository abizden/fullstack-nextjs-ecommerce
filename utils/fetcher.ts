import type { AnySchema, InferType } from 'yup';
import { ResponseError } from './responseError';
import type { HTTPMethod } from './types';
import * as Sentry from '@sentry/nextjs';

type FetcherConfig<Schema extends AnySchema | null> = {
  readonly method: HTTPMethod;
  readonly schema: Schema;
  readonly body?: object;
  readonly config?: RequestInit;
};

export async function fetcher<Schema extends null>(
  path: string,
  { method, body, config, schema }: FetcherConfig<Schema>,
): Promise<null>;

export async function fetcher<Schema extends AnySchema>(
  path: string,
  { method, body, config, schema }: FetcherConfig<Schema>,
): Promise<InferType<Schema>>;

export async function fetcher<Schema extends AnySchema | null>(
  path: string,
  { method, body, config, schema }: FetcherConfig<Schema>,
) {
  try {
    const response = await fetch(path, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method,
      ...(body && { body: JSON.stringify(body) }),
    });
    if (response.ok) {
      if (!schema) {
        return null;
      }

      const data = await response.json();

      return schema.cast(data);
    }
    Sentry.captureException(response.statusText);
    throw new ResponseError(response.statusText, response.status);
  } catch (err) {
    if (err instanceof ResponseError) {
      throw err;
    }
    Sentry.captureException(err);
    throw new ResponseError('Something went wrong during fetching!');
  }
}
