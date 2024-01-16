/**
 * moodleDownloader - a chrome extension for batch downloading Moodle resources 💾
 * Copyright (c) 2018 Harsil Patel
 * https://github.com/harsilspatel/MoodleDownloader
 */

function getFilesUnderResources() {
	let files = [];
	for (section of document.getElementsByClassName("liItem")) {
		let file;
		let mainSection = document.getElementById("pageTitleText").innerHTML.split('>')[1].split('<')[0];
		let subSection = section.innerHTML.split(`<span style="color:#000000;">`)[1].split("</span>")[0];
		let attachments = [];
		for (aTag of section.getElementsByTagName("a")) {
			if (aTag.href.includes("content-rid"))
				attachments.push(aTag);
		}
		if (attachments.length > 0) {
			for (attachment of attachments) {
				file = {};
				file.name = attachment.innerHTML.split("&nbsp;")[1];
				file.downloadOptions = {url: attachment.href};
				file.type = "FILE";
				file.section = mainSection;
				file.subSection = subSection;
				file.inSectionFolder = (attachments.length > 1);
				files.push(file);
			}
		} else {
			file = {};
			file.name = subSection;
			file.downloadOptions = {url: section.getElementsByTagName("a")[0].href};
			file.section = mainSection;
			file.subSection = subSection;
			file.inSectionFolder = false;
			files.push(file);
		}
	}

	return files;
}

function getFiles() {
	let allFiles;
	if (document.getElementsByClassName("courseName")[0]) {
		const courseName = document.getElementsByClassName("courseName")[0].innerHTML;

		allFiles = getFilesUnderResources();
		allFiles.forEach(file => (file.course = courseName));
		console.log(allFiles);
	}
	return allFiles;
}

getFiles();
