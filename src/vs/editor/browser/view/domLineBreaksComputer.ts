/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createTrustedTypesPolicy } from '../../../base/browser/trustedTypes.js';
import { CharCode } from '../../../base/common/charCode.js';
import * as strings from '../../../base/common/strings.js';
import { assertReturnsDefined } from '../../../base/common/types.js';
import { applyFontInfo } from '../config/domFontInfo.js';
import { WrappingIndent } from '../../common/config/editorOptions.js';
import { StringBuilder } from '../../common/core/stringBuilder.js';
import { IModelDecoration, InjectedTextOptions, TextDirection } from '../../common/model.js';
import { ILineBreaksComputer, ILineBreaksComputerContext, ILineBreaksComputerFactory, ModelLineProjectionData } from '../../common/modelLineProjectionData.js';
import { InlineClassName, LineInjectedText } from '../../common/textModelEvents.js';
import { FontInfo } from '../../common/config/fontInfo.js';
import { RenderLineInput, renderViewLine } from '../../common/viewLayout/viewLineRenderer.js';
import { IViewLineTokens } from '../../common/tokens/lineTokens.js';
import { LineDecoration } from '../../common/viewLayout/lineDecorations.js';
import { InlineDecorationType } from '../../common/viewModel/inlineDecorations.js';

const ttPolicy = createTrustedTypesPolicy('domLineBreaksComputer', { createHTML: value => value });

export class DOMLineBreaksComputerFactory implements ILineBreaksComputerFactory {

	public static create(targetWindow: Window): DOMLineBreaksComputerFactory {
		return new DOMLineBreaksComputerFactory(new WeakRef(targetWindow));
	}

	constructor(private targetWindow: WeakRef<Window>) {
	}

	public createLineBreaksComputer(context: ILineBreaksComputerContext, fontInfo: FontInfo, tabSize: number, wrappingColumn: number, wrappingIndent: WrappingIndent, wordBreak: 'normal' | 'keepAll', wrapOnEscapedLineFeeds: boolean): ILineBreaksComputer {
		const lineNumbers: number[] = [];
		return {
			addRequest: (lineNumber: number, previousLineBreakData: ModelLineProjectionData | null) => {
				lineNumbers.push(lineNumber);
			},
			finalize: () => {
				return createLineBreaks(assertReturnsDefined(this.targetWindow.deref()), context, lineNumbers, fontInfo, tabSize, wrappingColumn, wrappingIndent, wordBreak);
			}
		};
	}
}

function createLineBreaks(targetWindow: Window, context: ILineBreaksComputerContext, lineNumbers: number[], fontInfo: FontInfo, tabSize: number, firstLineBreakColumn: number, wrappingIndent: WrappingIndent, wordBreak: 'normal' | 'keepAll'): (ModelLineProjectionData | null)[] {
	function createEmptyLineBreakWithPossiblyInjectedText(lineNumber: number): ModelLineProjectionData | null {
		const injectedTexts = context.getLineInjectedText(lineNumber);
		if (injectedTexts) {
			const lineContent = context.getLineContent(lineNumber);
			const lineText = LineInjectedText.applyInjectedText(lineContent, injectedTexts);

			const injectionOptions = injectedTexts.map(t => t.options);
			const injectionOffsets = injectedTexts.map(text => text.column - 1);

			// creating a `LineBreakData` with an invalid `breakOffsetsVisibleColumn` is OK
			// because `breakOffsetsVisibleColumn` will never be used because it contains injected text
			return new ModelLineProjectionData(injectionOffsets, injectionOptions, [lineText.length], [], 0);
		} else {
			return null;
		}
	}

	if (firstLineBreakColumn === -1) {
		const result: (ModelLineProjectionData | null)[] = [];
		for (let i = 0, len = lineNumbers.length; i < len; i++) {
			result[i] = createEmptyLineBreakWithPossiblyInjectedText(lineNumbers[i]);
		}
		return result;
	}

	const overallWidth = Math.round(firstLineBreakColumn * fontInfo.typicalHalfwidthCharacterWidth);
	const additionalIndent = (wrappingIndent === WrappingIndent.DeepIndent ? 2 : wrappingIndent === WrappingIndent.Indent ? 1 : 0);
	const additionalIndentSize = Math.round(tabSize * additionalIndent);
	const additionalIndentLength = Math.ceil(fontInfo.spaceWidth * additionalIndentSize);

	const containerDomNode = document.createElement('div');
	applyFontInfo(containerDomNode, fontInfo);
	containerDomNode.style.setProperty('--editor-font-size', fontInfo.fontSize + 'px');

	const sb = new StringBuilder(10000);
	const firstNonWhitespaceIndices: number[] = [];
	const wrappedTextIndentLengths: number[] = [];
	const renderLineContents: string[] = [];
	const allVisibleColumns: number[][] = [];
	for (let i = 0; i < lineNumbers.length; i++) {
		const lineNumber = lineNumbers[i];
		const lineContent = context.getLineContent(lineNumber);
		const injectedTextsPerLine = context.getLineInjectedText(lineNumber);
		const inlineClassNamesPerLine = context.getLineInlineClassNames(lineNumber);

		let firstNonWhitespaceIndex = 0;
		let wrappedTextIndentLength = 0;
		let width = overallWidth;

		if (wrappingIndent !== WrappingIndent.None) {
			firstNonWhitespaceIndex = strings.firstNonWhitespaceIndex(lineContent);
			if (firstNonWhitespaceIndex === -1) {
				// all whitespace line
				firstNonWhitespaceIndex = 0;

			} else {
				// Track existing indent

				for (let i = 0; i < firstNonWhitespaceIndex; i++) {
					const charWidth = (
						lineContent.charCodeAt(i) === CharCode.Tab
							? (tabSize - (wrappedTextIndentLength % tabSize))
							: 1
					);
					wrappedTextIndentLength += charWidth;
				}

				const indentWidth = Math.ceil(fontInfo.spaceWidth * wrappedTextIndentLength);

				// Force sticking to beginning of line if no character would fit except for the indentation
				if (indentWidth + fontInfo.typicalFullwidthCharacterWidth > overallWidth) {
					firstNonWhitespaceIndex = 0;
					wrappedTextIndentLength = 0;
				} else {
					width = overallWidth - indentWidth;
				}
			}
		}

		const renderLineContent = lineContent.substr(firstNonWhitespaceIndex);
		const tokens = context.getLineTokens(lineNumber);
		const customFontSizes = context.getLineCustomFontSizes(lineNumber);
		allVisibleColumns[i] = renderLine(renderLineContent, wrappedTextIndentLength, tabSize, width, sb, additionalIndentLength, injectedTextsPerLine, inlineClassNamesPerLine, customFontSizes, fontInfo, tokens);
		firstNonWhitespaceIndices[i] = firstNonWhitespaceIndex;
		wrappedTextIndentLengths[i] = wrappedTextIndentLength;
		renderLineContents[i] = renderLineContent;
	}
	const html = sb.build();
	const trustedhtml = ttPolicy?.createHTML(html) ?? html;
	containerDomNode.innerHTML = trustedhtml as string;

	containerDomNode.style.position = 'absolute';
	containerDomNode.style.top = '10000px';
	containerDomNode.style.whiteSpace = 'pre-wrap';
	if (wordBreak === 'keepAll') {
		// word-break: keep-all; overflow-wrap: anywhere
		containerDomNode.style.wordBreak = 'keep-all';
		containerDomNode.style.overflowWrap = 'anywhere';
	} else {
		// overflow-wrap: break-word
		containerDomNode.style.wordBreak = 'inherit';
		containerDomNode.style.overflowWrap = 'break-word';
	}
	targetWindow.document.body.appendChild(containerDomNode);

	const range = document.createRange();
	const lineDomNodes = Array.prototype.slice.call(containerDomNode.children, 0);

	const result: (ModelLineProjectionData | null)[] = [];
	for (let i = 0; i < lineNumbers.length; i++) {
		const lineNumber = lineNumbers[i];
		const lineDomNode = lineDomNodes[i];
		const breakOffsets: number[] | null = readLineBreaks(range, lineDomNode, renderLineContents[i]);
		if (breakOffsets === null) {
			result[i] = createEmptyLineBreakWithPossiblyInjectedText(lineNumber);
			continue;
		}

		const firstNonWhitespaceIndex = firstNonWhitespaceIndices[i];
		const wrappedTextIndentLength = wrappedTextIndentLengths[i] + additionalIndentSize;
		const visibleColumns = allVisibleColumns[i];

		const breakOffsetsVisibleColumn: number[] = [];
		for (let j = 0, len = breakOffsets.length; j < len; j++) {
			breakOffsetsVisibleColumn[j] = visibleColumns[breakOffsets[j]];
		}

		if (firstNonWhitespaceIndex !== 0) {
			// All break offsets are relative to the renderLineContent, make them absolute again
			for (let j = 0, len = breakOffsets.length; j < len; j++) {
				breakOffsets[j] += firstNonWhitespaceIndex;
			}
		}

		let injectionOptions: InjectedTextOptions[] | null;
		let injectionOffsets: number[] | null;
		const curInjectedTexts = context.getLineInjectedText(lineNumber);
		if (curInjectedTexts) {
			injectionOptions = curInjectedTexts.map(t => t.options);
			injectionOffsets = curInjectedTexts.map(text => text.column - 1);
		} else {
			injectionOptions = null;
			injectionOffsets = null;
		}

		result[i] = new ModelLineProjectionData(injectionOffsets, injectionOptions, breakOffsets, breakOffsetsVisibleColumn, wrappedTextIndentLength);
	}

	containerDomNode.remove();
	return result;
}

function renderLine(lineContent: string, initialVisibleColumn: number, tabSize: number, width: number, sb: StringBuilder, wrappingIndentLength: number, lineInjectedText: LineInjectedText[] | null, inlineClassNames: InlineClassName[] | null, customFontSizes: IModelDecoration[], fontInfo: FontInfo, tokens: IViewLineTokens): number[] {
	sb.appendString('<div class="monaco-dom-line-breaks-computer" style="');
	if (wrappingIndentLength !== 0) {
		const hangingOffset = String(wrappingIndentLength);
		sb.appendString('text-indent: -');
		sb.appendString(hangingOffset);
		sb.appendString('px; padding-left: ');
		sb.appendString(hangingOffset);
		sb.appendString('px; box-sizing: border-box;');
	}
	sb.appendString('width:');
	sb.appendString(String(width));
	sb.appendString('px;">');

	const lineDecorations: LineDecoration[] = [];

	if (inlineClassNames) {
		for (const inlineClassName of inlineClassNames) {
			lineDecorations.push(new LineDecoration(
				inlineClassName.startColumn,
				inlineClassName.endColumn,
				inlineClassName.className,
				InlineDecorationType.RegularAffectingLetterSpacing,
				0,
			));
		}
	}

	if (customFontSizes) {
		for (const f of customFontSizes) {
			lineDecorations.push(new LineDecoration(
				f.range.startColumn,
				f.range.endColumn,
				'',
				InlineDecorationType.RegularAffectingLetterSpacing,
				Number(f.options.fontSize)
			));
		}
	}

	const input = new RenderLineInput(
		false,
		fontInfo.canUseHalfwidthRightwardsArrow,
		lineContent,
		false,
		strings.isBasicASCII(lineContent),
		strings.containsRTL(lineContent),
		0,
		tokens,
		lineDecorations,
		tabSize,
		0,
		fontInfo.spaceWidth,
		fontInfo.middotWidth,
		fontInfo.wsmiddotWidth,
		Number.MAX_SAFE_INTEGER,
		'none',
		false,
		false,
		null,
		TextDirection.LTR,
		10,
		false,
		true
	);

	renderViewLine(input, sb);
	sb.appendString('</div>');

	return new Array<number>(lineContent.length).fill(0);
}

function readLineBreaks(range: Range, lineDomNode: HTMLDivElement, lineContent: string): number[] | null {
	if (lineContent.length <= 1) {
		return null;
	}

	const breakOffsets: number[] = [];
	let lineOffset = 0;
	let previousMiddle: number | undefined;

	try {
		for (const wrapper of lineDomNode.children) {
			for (const child of wrapper.children) {
				const textNode = child.firstChild;
				const length = textNode?.textContent?.length;
				if (length) {
					discoverBreaks(textNode, 0, length);
				}
			}
		}
	} catch (err) {
		console.error(err);
		return null;
	}

	if (breakOffsets.length === 0) {
		return null;
	}

	breakOffsets.push(lineContent.length);
	return breakOffsets;

	function discoverBreaks(node: ChildNode, low: number, high: number) {
		if (low === high) {
			return;
		}

		range.setStart(node, low);
		range.setEnd(node, high);

		const chunkSize = high - low;
		const rects = range.getClientRects();
		if (rects.length === 0) {
			lineOffset += chunkSize;
		} else if (rects.length === 1) {
			const rect = rects[0];
			const middle = (rect.top + rect.bottom) / 2;

			if (previousMiddle !== undefined && Math.abs(previousMiddle - middle) > 0.5) {
				breakOffsets.push(lineOffset);
			}

			previousMiddle = middle;
			lineOffset += chunkSize;
		} else {
			const middle = low + ((chunkSize / 2) | 0);

			discoverBreaks(node, low, middle);
			discoverBreaks(node, middle, high);
		}
	}
}
