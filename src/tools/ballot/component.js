import { Button, Switch, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function BallotComponent(props) {
	const DEFAULT_INITIAL_DATA = () => {
		return {
			title: "Title",
			topic: "Topic",
			options: [],
		};
	};
	const [data, setData] = useState(
		props.data.title ? props.data : DEFAULT_INITIAL_DATA
	);

	const updateData = (newData) => {
		setData(newData);
		if (props.onDataChange) {
			props.onDataChange(newData);
		}
	};

	const onOptionsChange = (options) => {
		console.log({ options });
		const newData = {
			...data,
		};
		newData.options = options;
		updateData(newData);
	};

	const addOption = (option) => {
		let newOptions = [...data.options, ...[option]];
		onOptionsChange(newOptions);
	};

	const removeOption = (option) => {
		if (data.options.length > 1) {
			let filteredArray = data.options.filter((el) => el !== option);
			onOptionsChange(filteredArray);
		}
	};

	const onTitleChange = (title) => {
		const newData = {
			...data,
		};
		newData.title = title;
		updateData(newData);
	};
	const onTopicChange = (topic) => {
		const newData = {
			...data,
		};
		newData.topic = topic;
		updateData(newData);
	};
	const [option, setOption] = useState("");
	return (
		<>
			{!props.readOnly && (
				<div>
					<p>Title</p>
					<TextField
						onChange={(e) => {
							onTitleChange(e.target.value);
						}}
					/>
					<p>Topic</p>
					<TextField
						onChange={(e) => {
							onTopicChange(e.target.value);
						}}
					/>
					<p>Add Option</p>

					<TextField
						placeholder='New Option'
						onChange={(e) => {
							setOption(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							addOption(option);
						}}
					>
						Add
					</Button>
					{data.options.map(function (d, idx) {
						return (
							<>
								<p>{d}</p>
								<Button
									onClick={() => {
										removeOption(d);
									}}
								>
									Remove
								</Button>
							</>
						);
					})}
				</div>
			)}
			{props.readOnly && (
				<div>
					<p>{props.data.title}</p>
				</div>
			)}
		</>
	);
}
