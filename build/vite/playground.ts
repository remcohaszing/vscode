/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// allow-any-unicode-file

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

`.repeat(10);

const model = monaco.editor.createModel(content);

const editor = monaco.editor.create(document.getElementById('editor')!, {
	model,
	// Remove line numbers from the left margin
	lineNumbers: 'off',
	// Disable minimap
	minimap: {
		enabled: false,
	},

	fontFamily: 'Arial, sans-serif',
});



model.deltaDecorations([], [
	{
		range: model.getFullModelRange(),
		options: {
			inlineClassName: 'cs-prompt-output',
			inlineClassNameAffectsLetterSpacing: true,
			lineHeight: 0.854,
		}
	}
]);


function animate(currentTime: number) {
	editor.setScrollTop(currentTime / 30);
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
