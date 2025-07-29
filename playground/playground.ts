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

const content = `This text is relatively long line. It’s a broken line that has a big word in it. That word is somewhere around the middle part of this line.

This whole line is big, because it has the word “whole” in it. The decoration is only applied to the word “whole”, but it specifies the option “isWholeLine: true”.
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
		for (const match of line.matchAll(/big/gi)) {
			newDecorations.push({
				range: {
					startLineNumber: index + 1,
					startColumn: match.index! + 1,
					endLineNumber: index + 1,
					endColumn: match.index! + match[0].length + 1
				},
				options: {
					inlineClassName: `cuescript-header-4`,
					inlineClassNameAffectsLetterSpacing: true,
					lineHeight: 40
				}
			});
		}

		for (const match of line.matchAll(/whole/gi)) {
			newDecorations.push({
				range: {
					startLineNumber: index + 1,
					startColumn: match.index! + 1,
					endLineNumber: index + 1,
					endColumn: match.index! + match[0].length + 1
				},
				options: {
					inlineClassName: `cuescript-header-4`,
					inlineClassNameAffectsLetterSpacing: true,
					isWholeLine: true,
					lineHeight: 40
				}
			});
		}
	}

	oldDecorations = model.deltaDecorations(oldDecorations, newDecorations);
}

model.onDidChangeContent(updateDecorations);
updateDecorations();
