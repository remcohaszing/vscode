/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// allow-any-unicode-file

const content = `The world has changed

I feel it in the water.

I feel it in the earth.

I smell it in the air.

Much that once was is lost, for none now live who remember it.

It began with the forging of the Great Rings. Three were given to the Elves, immortal, wisest and fairest of all beings. Seven to the Dwarf-Lords, great miners and craftsmen of the mountain halls. And nine, nine rings were gifted to the race of Men, who above all else desire power. For within these rings was bound the strength and the will to govern each race. But they were all of them deceived, for another ring was made. Deep in the land of Mordor, in the Fires of Mount Doom, the Dark Lord Sauron forged a master ring, and into this ring he poured his cruelty, his malice and his will to dominate all life.

One ring to rule them all.

One by one, the free lands of Middle-Earth fell to the power of the Ring, but there were some who resisted. A last alliance of men and elves marched against the armies of Mordor, and on the very slopes of Mount Doom, they fought for the freedom of Middle-Earth. Victory was near, but the power of the ring could not be undone. It was in this moment, when all hope had faded, that Isildur, son of the king, took up his father’s sword.

Sauron, enemy of the free peoples of Middle-Earth, was defeated. The Ring passed to Isildur, who had this one chance to destroy evil forever, but the hearts of men are easily corrupted. And the ring of power has a will of its own. It betrayed Isildur, to his death.

And some things that should not have been forgotten were lost. History became legend. Legend became myth. And for two and a half thousand years, the ring passed out of all knowledge. Until, when chance came, it ensnared another bearer.

It came to the creature Gollum, who took it deep into the tunnels of the Misty Mountains. And there it consumed him. The ring gave to Gollum unnatural long life. For five hundred years it poisoned his mind, and in the gloom of Gollum’s cave, it waited. Darkness crept back into the forests of the world. Rumor grew of a shadow in the East, whispers of a nameless fear, and the Ring of Power perceived its time had come. It abandoned Gollum, but then something happened that the Ring did not intend. It was picked up by the most unlikely creature imaginable: a hobbit, Bilbo Baggins, of the Shire.

For the time will soon come when hobbits will shape the fortunes of all.

---

העולם השתנה

אני מרגיש את זה במים.

אני מרגיש את זה באדמה.

אני מריח את זה באוויר.

הרבה ממה שהיה פעם אבד, כי איש אינו חי עוד שזוכר זאת.

זה התחיל עם חישול הטבעות הגדולות. שלוש ניתנו לאלפים, בני האלפים, החכמים והיפים ביותר מכל היצורים. שבע לאדוני הגמדים, כורים גדולים ואומנים של אולמות ההרים. ותשע, תשע טבעות ניתנו במתנה לגזע בני האדם, אשר מעל לכל חפצים בכוח. כי בתוך הטבעות הללו היה קשור הכוח והרצון לשלוט בכל גזע. אבל כולם הוטעו, כי טבעת נוספת נוצרה. עמוק בארץ מורדור, באש הר האבדון, אדון האופל סאורון יצר טבעת אב, ולתוך טבעת זו הוא שפך את אכזריותו, את זדונו ואת רצונו לשלוט בכל החיים.

טבעת אחת לשלוט בכולם.

אחת אחת, אדמות הארץ התיכונה החופשיות נפלו לידי הטבעת, אך היו כאלה שהתנגדו. ברית אחרונה של אנשים ואלפים צעדה נגד צבאות מורדור, ועל מורדות הר האבדון, הם נלחמו על חירות הארץ התיכונה. הניצחון היה קרוב, אך לא ניתן היה לבטל את כוחה של הטבעת. ברגע זה, כאשר כל התקווה דעכה, איסילדור, בן המלך, לקח את חרב אביו.

סאורון, אויבם של עמי הארץ התיכונה החופשיים, הובס. הטבעת עברה לאיסילדור, שהייתה לו הזדמנות אחת להשמיד את הרוע לנצח, אך לבבותיהם של בני האדם מושחתים בקלות. ולטבעת הכוח יש רצון משלה. היא בגדה באיסילדור, אל מותו.

וכמה דברים שלא היו צריכים להישכח אבדו. ההיסטוריה הפכה לאגדה. אגדה הפכה למיתוס. ובמשך אלפיים וחצי שנה, הטבעת נעלמה מכל ידע. עד שכאשר הגיע המקרה, היא לכדה נושא אחר.

היא הגיעה ליצור גולום, שלקח אותה עמוק לתוך מנהרות הרי הערפל. ושם היא כילתה אותו. הטבעת העניקה לגולום חיים ארוכים באופן לא טבעי. במשך חמש מאות שנה היא הרעילה את מוחו, ובאפלולית מערתו של גולום היא חיכתה. החושך זחל חזרה ליערות העולם. שמועה על צל במזרח, לחישות של פחד אלמוני, וטבעת הכוח הבינה שזמנה הגיע. היא נטשה את גולום, אך אז קרה משהו שהטבעת לא התכוונה אליו. היא נאספה על ידי היצור הכי לא סביר שניתן להעלות על הדעת: הוביט, בילבו בגינס, מהפלך.

כי בקרוב יגיע הזמן שבו הוביטים יעצבו את גורלם של כולם.
`;

const model = monaco.editor.createModel(content, undefined, monaco.Uri.file('example.ts'));

const verticalScrollbarSize = 16;
const horizontalScrollbarSize = 12;
const editor = monaco.editor.create(document.getElementById('editor')!, {
	automaticLayout: true,
	fontFamily: 'arial',
	minimap: { enabled: false },
	scrollbar: {
		horizontalScrollbarSize,
		verticalScrollbarSize
	},
	wordWrap: 'on',
	wrappingStrategy: 'advanced',
	model,
});

// Make the model and editor available globally for fiddling in the console.
Object.assign(globalThis, {
	editor,
	model,
});

function registerDecoratorButton(id: string, options: monaco.editor.IModelDecorationOptions): undefined {
	const checkbox = document.getElementById(id) as HTMLInputElement;
	const knownDecorationIds = new Set<string>;

	checkbox.addEventListener('change', () => {
		const selections = editor.getSelections();
		if (!selections) {
			return;
		}

		const oldDecorationIds: string[] = [];
		const newDecorations: monaco.editor.IModelDeltaDecoration[] = [];

		selectionLoop: for (const selection of selections) {
			let range: monaco.Range = selection;
			const oldDecorations = model.getDecorationsInRange(selection, undefined, true);

			for (const oldDecoration of oldDecorations) {
				if (!knownDecorationIds.has(oldDecoration.id)) {
					continue;
				}

				oldDecorationIds.push(oldDecoration.id);
				knownDecorationIds.delete(oldDecoration.id);
				if (!checkbox.checked) {
					continue selectionLoop;
				}
				range = oldDecoration.range.plusRange(range);
			}

			if (options.isWholeLine) {
				range = new monaco.Range(
					range.startLineNumber,
					0,
					range.endLineNumber,
					model.getLineMaxColumn(range.endLineNumber)
				);
			}

			if (!range.isEmpty()) {
				newDecorations.push({ range, options });
			}
		}

		for (const id of model.deltaDecorations(oldDecorationIds, newDecorations)) {
			knownDecorationIds.add(id);
		}
	});

	editor.onDidChangeCursorPosition(event => {
		const decorations = model.getDecorationsInRange(monaco.Range.fromPositions(event.position, event.position), undefined, true);

		checkbox.checked = decorations.some(decoration => knownDecorationIds.has(decoration.id));
	});
}

registerDecoratorButton('big-inline', {
	inlineClassName: `big-inline`,
	inlineClassNameAffectsLetterSpacing: true,
	lineHeight: 40
});

registerDecoratorButton('big-whole-line', {
	inlineClassName: `big-whole-line`,
	inlineClassNameAffectsLetterSpacing: true,
	isWholeLine: true,
	lineHeight: 30
});

registerDecoratorButton('rtl', {
	isWholeLine: true,
	textDirection: monaco.editor.TextDirection.RTL
});

const scale = document.getElementById('scale') as HTMLInputElement;
scale.addEventListener('change', event => {
	const value = scale.valueAsNumber;
	monaco.editor.EditorZoom.setZoomLevel(value);
});

monaco.editor.EditorZoom.onDidChangeZoomLevel((zoomLevel) => {
	// https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/config/fontInfo.ts#L48
	const factor = 1 + zoomLevel * 0.1;
	editor.updateOptions({
		scrollbar: {
			horizontalScrollbarSize: horizontalScrollbarSize * factor,
			verticalScrollbarSize: verticalScrollbarSize * factor
		}
	});

	editor.getContainerDomNode().style.width = `${256 * factor}px`;
});
