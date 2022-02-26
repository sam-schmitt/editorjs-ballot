import { default as React, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import InlineCode from "@editorjs/inline-code";
import { Button } from "@material-ui/core";
import CodeTool from "@editorjs/code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import NestedList from "@editorjs/nested-list";
import TextVariantTune from "@editorjs/text-variant-tune";
import Warning from "@editorjs/warning";
import Paragraph from "editorjs-paragraph-with-alignment";
import Alert from "editorjs-alert";
import SocialPost from "editorjs-social-post-plugin";
import EditorJSButton from "editorjs-button";
import Blocks from "editorjs-blocks-react-renderer";
const DEFAULT_INITIAL_DATA = () => {
	return {
		time: new Date().getTime(),
		blocks: [
			{
				type: "header",
				data: {
					text: "This is my awesome editor!",
					level: 1,
				},
			},
		],
	};
};

const EDITOR_HOLDER_ID = "editorjs";
const READER_HOLDER_ID = "readerjs";

const Editor = (props) => {
	const ejInstance = useRef();
	const readerInstance = useRef();

	const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

	// This will run only once
	useEffect(() => {
		if (!ejInstance.current) {
			initEditor();
		}
		return () => {
			ejInstance.current.destroy();
			ejInstance.current = null;
		};
	}, []);
	useEffect(() => {
		if (!ejInstance.current) {
			initReader();
		}
		return () => {
			readerInstance.current.destroy();
			readerInstance.current = null;
		};
	}, []);
	const initEditor = () => {
		const editor = new EditorJS({
			holder: EDITOR_HOLDER_ID,
			logLevel: "ERROR",
			data: editorData,
			onReady: () => {
				ejInstance.current = editor;
			},
			onChange: async (o) => {
				let content = await o.saver.save();
				setEditorData(content);
			},
			tools: {
				header: { class: Header, inlineToolbar: true },
				embed: {
					class: Embed,
					inlineToolbar: true,
				},
				quote: {
					class: Quote,
					inlineToolbar: true,
					config: {
						quotePlaceholder: "Enter a quote",
						captionPlaceholder: "Quote's author",
					},
				},
				linkTool: {
					class: LinkTool,
					config: {
						endpoint: "http://localhost:4000/helper/fetchUrl", // Your backend endpoint for url data fetching,
					},
				},
				list: {
					class: NestedList,
					inlineToolbar: true,
				},
				delimiter: Delimiter,
				table: Table,
				inlineCode: {
					class: InlineCode,
				},
				code: CodeTool,
				Marker: {
					class: Marker,
				},
				underline: { class: Underline },
				textVariant: TextVariantTune,
				warning: {
					class: Warning,
					inlineToolbar: true,
					shortcut: "CMD+SHIFT+W",
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar: true,
				},
				alert: {
					class: Alert,
					inlineToolbar: true,
					shortcut: "CMD+SHIFT+A",
					config: {
						defaultType: "primary",
						messagePlaceholder: "Enter something",
					},
				},
				// socialPost: SocialPost,
				AnyButton: {
					class: EditorJSButton,
					inlineToolbar: true,
					config: {
						css: {
							btnColor: "btn--gray",
						},
					},
				},
			},
			i18n: {
				messages: {
					tools: {
						AnyButton: {
							"Button Text": "Button Text",
							"Link Url": "Enter a link",
							"Set": "Confirm",
							"Default Button": "Button",
						},
					},
				},
			},
		});
	};

	const [Reader, setReader] = useState(null);

	const initReader = () => {
		let reader = new EditorJS({
			holder: READER_HOLDER_ID,
			logLevel: "ERROR",
			data: editorData,
			readOnly: true,
			onReady: () => {
				readerInstance.current = reader;
			},
			onChange: async (o) => {
				let content = await o.saver.save();
				setEditorData(content);
			},
			tools: {
				header: { class: Header, inlineToolbar: true },
				embed: {
					class: Embed,
					inlineToolbar: true,
				},
				quote: {
					class: Quote,
					inlineToolbar: true,
					config: {
						quotePlaceholder: "Enter a quote",
						captionPlaceholder: "Quote's author",
					},
				},
				linkTool: {
					class: LinkTool,
					config: {
						endpoint: "http://localhost:4000/helper/fetchUrl", // Your backend endpoint for url data fetching,
					},
				},
				list: {
					class: NestedList,
					inlineToolbar: true,
				},
				delimiter: Delimiter,
				table: Table,
				inlineCode: {
					class: InlineCode,
				},
				code: CodeTool,
				Marker: {
					class: Marker,
				},
				underline: { class: Underline },
				textVariant: TextVariantTune,
				warning: {
					class: Warning,
					inlineToolbar: true,
					shortcut: "CMD+SHIFT+W",
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar: true,
				},
				alert: {
					class: Alert,
					inlineToolbar: true,
					shortcut: "CMD+SHIFT+A",
					config: {
						defaultType: "primary",
						messagePlaceholder: "Enter something",
					},
				},
				// socialPost: SocialPost,
				AnyButton: {
					class: EditorJSButton,
					inlineToolbar: true,
					config: {
						css: {
							btnColor: "btn--gray",
						},
					},
				},
			},
			i18n: {
				messages: {
					tools: {
						AnyButton: {
							"Button Text": "Button Text",
							"Link Url": "Enter a link",
							"Set": "Confirm",
							"Default Button": "Button",
						},
					},
				},
			},
		});
	};

	return (
		<React.Fragment>
			<div id={EDITOR_HOLDER_ID}> </div>
			<Button
				onClick={() => {
					initReader();
					console.log(editorData);
				}}
			>
				Save
			</Button>
			<h1>Reader</h1>
			<div id={READER_HOLDER_ID}> </div>
		</React.Fragment>
	);
};

export default Editor;
