/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Enable automatic dark mode for accessibility.
const dark = matchMedia('(prefers-color-scheme: dark)');
monaco.editor.setTheme(dark.matches ? 'vs-dark' : 'vs-light');
dark.addEventListener('change', () => {
	monaco.editor.setTheme(dark.matches ? 'vs-dark' : 'vs-light');
});

const content = `# This is the title of a markdown document

This is the content of a markdown document.

## This is a level 2 header

This is some more content.

### This is a level 3 header

This is some more content.

#### This is a level 4 header

This is some more content.

##### This is a level 5 header

This is some more content.

###### This is a level 6 header

This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content. This is some more content.
`;

const model = monaco.editor.createModel(content, undefined, monaco.Uri.file('example.ts'));

const editor = monaco.editor.create(document.getElementById('editor')!, {
	automaticLayout: true,
	wordWrap: 'on',
	wrappingStrategy: 'advanced',
	model,
});

// Make the model and editor available globally for fiddling in the console.
Object.assign(globalThis, {
	editor,
	model,
});

let oldDecorations: string[] = [];
function updateDecorations() {
	const newDecorations: monaco.editor.IModelDeltaDecoration[] = [];

	const lines = model.getValue().split('\n');
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		const match = line.match(/^#{1,6} /);
		if (match) {
			newDecorations.push({
				range: {
					startLineNumber: index + 1,
					startColumn: 1,
					endLineNumber: index + 1,
					endColumn: line.length + 1
				},
				options: {
					inlineClassName: `cuescript-header-${match[0].length - 1}`,
					inlineClassNameAffectsLetterSpacing: true,
					lineHeight: 19 + 10 * (8 - match[0].length)
				}
			});
		}
	}

	oldDecorations = model.deltaDecorations(oldDecorations, newDecorations);
}

model.onDidChangeContent(updateDecorations);
updateDecorations();
