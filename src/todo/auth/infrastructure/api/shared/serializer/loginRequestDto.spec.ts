import type { Ok, Err } from 'src/chassys/chassys-api/Result.js';

export declare const loginRequestDto: (v: unknown) => Ok<{ email: string; password: string }> | Err;
