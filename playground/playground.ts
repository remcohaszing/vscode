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

const content = `
I smell it in the air.

Much that once was is lost, for none now live who remember it.

It began with the forging of the Great Rings. Three were given to the Elves, immortal, wisest and fairest of all beings. Seven to the Dwarf-Lords, great miners and craftsmen of the mountain halls. And nine, nine rings were gifted to the race of Men, who above all else desire power. For within these rings was bound the strength and the will to govern each race. But they were all of them deceived, for another ring was made. Deep in the land of Mordor, in the Fires of Mount Doom, the Dark Lord Sauron forged a master ring, and into this ring he poured his cruelty, his malice and his will to dominate all life.

One ring to rule them all.

אני מריח את זה באוויר.

הרבה ממה שהיה פעם אבד, כי איש אינו חי עוד שזוכר זאת.

זה התחיל עם חישול הטבעות הגדולות. שלוש ניתנו לאלפים, בני האלמות, החכמים והיפים ביותר מכל היצורים. שבע לאדוני הגמדים, כורים גדולים ואומנים של אולמות ההרים. ותשע, תשע טבעות ניתנו במתנה לגזע בני האדם, אשר מעל לכל חפצים בכוח. כי בתוך הטבעות הללו היה קשור הכוח והרצון לשלוט בכל גזע. אבל כולם הוטעו, כי טבעת נוספת נוצרה. עמוק בארץ מורדור, באש הר האבדון, אדון האופל סאורון חישל טבעת אב, ולתוך טבעת זו הוא שפך את אכזריותו, את זדונו ואת רצונו לשלוט בכל החיים.

טבעת אחת לשלוט בכולם.
`;

const model = monaco.editor.createModel(content, undefined, monaco.Uri.file('example.ts'));

const editor = monaco.editor.create(document.getElementById('editor')!, {
	automaticLayout: true,
	disableMonospaceOptimizations: true,
	fontFamily: 'sans-serif',
	model,
	wordWrap: 'on',
	wrappingStrategy: 'advanced',
});

// Make the model and editor available globally for fiddling in the console.
Object.assign(globalThis, {
	editor,
	model,
});

const collection = editor.createDecorationsCollection();

document.getElementById('rtl-button')!.addEventListener('click', () => {
	collection.set((editor.getSelections() || []).map<monaco.editor.IModelDeltaDecoration>(selection => ({
		range: selection,
		options: {
			inlineClassName: 'rtl',
			textDirection: monaco.editor.TextDirection.RTL
		}
	})));
});
