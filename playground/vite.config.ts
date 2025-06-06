/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { defineConfig } from 'vite';

export default defineConfig({
	esbuild: { tsconfigRaw: { compilerOptions: { experimentalDecorators: true } } }
});
