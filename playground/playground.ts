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
`;

const hebrew = `העולם השתנה

אני מרגיש את זה במים.

אני מרגיש את זה באדמה.

אני מריח) את זה( באוויר.()

הרבה מה שהיה פעם הלך לאיבוד, כי לא חי כיום איש שזוכר זאת.

זה התחיל עם חישול הטבעות הגדולות. שלושה ניתנו לאלפים, בני אלמוות, החכמים והיפים מכל היצורים. שבעה לגמדים-אדונים, כורים ובעלי מלאכה גדולים של אולמות ההרים. ותשע, תשע טבעות הוענקו לגזע הגברים, שמעל הכל חפצים בכוח. שכן בתוך הטבעות הללו היה קשור הכוח והרצון לשלוט בכל גזע. אבל כולם הלכו שולל, כי טבעת נוספת נוצרה. עמוק בארץ מורדור, בשר(asd)יפות הר האבדון, אדון האופל סאורון חישל טבעת אמן, ולתוך הטasdבעת הזו הוא שפך את אכזריותו, זדון ורצונו לשלוט בכל החיים.

טבעת אחת שתשלוט בכולם.

בזו אחר זו נפלו אדמותיה החופשיות של הארץ התיכונה לכוחה של הטבעת, אך היו כאלה שהתנגדו. ברית אחרונה של אנשים ואלפים צעדה נגד צבאות מורדור, ובמדרונות הר האבדון ממש, הם נלחמו למען חירותה של הארץ התיכונה. הניצחון היה קרוב, אבל לא ניתן היה לבטל את כוחה של הטבעת. זה היה ברגע זה, כאשר כל התקווה התפוגגה, איסילדור, בן המלך, הרים את חרבו של אביו.

סאורון, אויבם של העמים החופשיים של הארץ התיכונה, הובס. הטבעת עברה לאיסילדור, שהיתה לו הזדמנות אחת להשמיד את הרוע לנצח, אבל לבם של בני אדם מושחת בקלות. ולטבעת הכוח יש רצון משלה. זה בגד באיסילדור, עד מותו.

וכמה דברים שלא היו צריכים להישכח אבדו. ההיסטוריה הפכה לאגדה. האגדה הפכה למיתוס. ובמשך אלפיים וחצי שנים, הטבעת חלפה מכל הידע. עד שכאשר הגיע המקרה, הוא לכד נושא אחר.

זה הגיע אל היצור גולום, שלקח אותו עמוק לתוך המנהרות של הרי הערפילי. ושם זה כלה אותו. הטבעת העניקה לגולום חיים ארוכים לא טבעיים. במשך חמש מאות שנה זה הרעיל את מוחו, ובאפלולית המערה של גולום, זה חיכה. החושך התגנב בחזרה אל יערות העולם. השמועה צמחה על צל במזרח, לחישות של פחד חסר שם, וטבעת הכוח תפסה שהגיע זמנה. זה נטש את גולום, אבל אז קרה משהו שהטבעת לא התכוונה. הוא נאסף על ידי היצור הכי לא סביר שאפשר להעלות על הדעת: הוביט, בילבו באגינס, מהעיר.

כי בקרוב יגיע הזמן שבו ההוביטים יעצבו את מזלם של כולם.
`;

const model = monaco.editor.createModel(hebrew, undefined, monaco.Uri.file('example.ts'));


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
const textCollection = editor.createDecorationsCollection();

editor.addAction({
	keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
	id: 'bold',
	label: 'Bold',
	run(editor) {
		const selections = editor.getSelections();
		if (!selections) {
			return;
		}

		boldCollection.set(selections.map((selection) => (
			{
				range: selection,
				options: {
					inlineClassNameAffectsLetterSpacing: true,
					lineHeight: 50,
					inlineClassName: 'cuescript bold'
				}
			}
		)));
	},
});

editor.addAction({
	keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG],
	id: 'after',
	label: 'After',
	run(editor) {
		const selections = editor.getSelections();
		if (!selections) {
			return;
		}

		textCollection.set(selections.map((selection) => (
			{
				range: selection,
				options: {
					inlineClassNameAffectsLetterSpacing: true,
					inlineClassName: 'cuescript bold',
					after: {
						inlineClassName: 'foo',
						content: 'XXX'
					},
				}
			}
		)));
	},
});

// Make the model and editor available globally for fiddling in the console.
Object.assign(globalThis, {
	editor,
	model,
});
