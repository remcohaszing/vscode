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

const content = `The world has changed.

I feel it in the water.

I feel it in the earth.

I smell it in the air.

Much that once was is lost, for
none now live who remember it.

It began with the forging of the
Great Rings. Three were given to
the Elves, immortal, wisest and
fairest of all beings. Seven to
the Dwarf-Lords, great miners
and craftsmen of the mountain
halls. And nine, nine rings were
gifted to the race of Men, who
above all else desire power. For
within these rings was bound the
strength and the will to govern
each race. But they were all of
them deceived, for another ring
was made. Deep in the land of
Mordor, in the Fires of Mount
Doom, the Dark Lord Sauron
forged a master ring, and into
this ring he poured his cruelty,
his malice and his will to
dominate all life.

One ring to rule them all.

`.repeat(100);

const model = monaco.editor.createModel(content);

model.deltaDecorations(
	[],
	[
		{
			range: model.getFullModelRange(),
			options: {
				lineHeight: 0.9876,
			},
		},
	],
);

const root = document.getElementById('sampleContent');
if (root) {
	const editor = monaco.editor.create(root, {
		model,
		lineNumbers: 'off',
		minimap: { enabled: false },
		fontFamily: 'Arial, sans-serif',
	});

	const animate = (currentTime: number) => {
		editor.setScrollTop(currentTime / 30);
		requestAnimationFrame(animate);
	};

	requestAnimationFrame(animate);
}
