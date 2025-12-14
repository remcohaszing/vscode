/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/// <reference path="../../src/vs/monaco.d.ts" />
/* eslint-disable local/code-no-standalone-editor */

export * from '../../src/vs/editor/editor.main';
import './style.css';
import * as monaco from '../../src/vs/editor/editor.main';

globalThis.monaco = monaco;

// Enable automatic dark mode for accessibility.
const dark = matchMedia('(prefers-color-scheme: dark)');
monaco.editor.setTheme(dark.matches ? 'vs-dark' : 'vs-light');
dark.addEventListener('change', () => {
	monaco.editor.setTheme(dark.matches ? 'vs-dark' : 'vs-light');
});
