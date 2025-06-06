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

const content = `Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1. Line 1.

A A A A A A A A A A A A A A A A A A

אני מרגיש את זה במים

test

Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3. Line 3.
`;

const model = monaco.editor.createModel(content, undefined, monaco.Uri.file('example.txt'));


const editor = monaco.editor.create(document.getElementById('editor')!, {
	automaticLayout: true,
	autoIndent: 'none',
	accessibilitySupport: 'off',
	accessibilityPageSize: 1,
	autoClosingBrackets: 'never',
	autoClosingComments: 'never',
	autoClosingDelete: 'never',
	autoClosingOvertype: 'never',
	autoClosingQuotes: 'never',
	autoSurround: 'never',
	bracketPairColorization: { enabled: false },
	columnSelection: false,
	contextmenu: false,
	definitionLinkOpensInPeek: false,
	detectIndentation: false,
	disableLayerHinting: true,
	disableMonospaceOptimizations: true,
	fixedOverflowWidgets: false,
	inDiffEditor: false,
	largeFileOptimizations: true,
	linkedEditing: false,
	links: false,
	matchBrackets: 'never',
	parameterHints: { enabled: false },
	model,
	minimap: {
		enabled: false,
		side: 'left',
		maxColumn: 5,
		showSlider: 'always',
		renderCharacters: false,
		scale: 100
	},
	fontFamily: 'Arial, Arimo, sans-serif, ui-sans-serif',
	fontLigatures: false,
	fontVariations: false,
	fontWeight: 'normal',
	fontSize: 14,
	lineHeight: 0,
	letterSpacing: 0,


	// Wrap lines at viewport width
	wordWrap: 'on',
	// Advanced wrapping strategy - necessary to ensure line wraps with variable width fonts
	wrappingStrategy: 'advanced',
	wordBreak: 'keepAll',
	wrappingIndent: 'none',
});

const boldCollection = editor.createDecorationsCollection();
const rtlCollection = editor.createDecorationsCollection();

document.getElementById('rtl-button')!.addEventListener('click', () => {
	const selections = editor.getSelections();
	if (!selections) {
		return;
	}

	rtlCollection.set(selections.map<monaco.editor.IModelDeltaDecoration>((selection) => (
		{
			range: selection,
			options: {
				inlineClassNameAffectsLetterSpacing: true,
				textDirection: monaco.editor.TextDirection.RTL,
				isWholeLine: true,
				inlineClassName: 'rtl'
			}
		}
	)));
});

editor.addAction({
	keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
	id: 'bold',
	label: 'Bold',
	run(editor) {
		const selections = editor.getSelections();
		if (!selections) {
			return;
		}

		boldCollection.set(selections.map<monaco.editor.IModelDeltaDecoration>((selection) => (
			{
				range: selection,
				options: {
					inlineClassNameAffectsLetterSpacing: true,
					inlineClassName: 'big'
				}
			}
		)));
	},
});

// editor.addAction({
// 	keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG],
// 	id: 'after',
// 	label: 'After',
// 	run(editor) {
// 		const selections = editor.getSelections();
// 		if (!selections) {
// 			return;
// 		}

// 		textCollection.set(selections.map((selection) => (
// 			{
// 				range: selection,
// 				options: {
// 					inlineClassNameAffectsLetterSpacing: true,
// 					inlineClassName: 'cuescript bold',
// 					// lineHeight: 72
// 				}
// 			}
// 		)));
// 	},
// });

// // Make the model and editor available globally for fiddling in the console.
// Object.assign(globalThis, {
// 	editor,
// 	model,
// });
