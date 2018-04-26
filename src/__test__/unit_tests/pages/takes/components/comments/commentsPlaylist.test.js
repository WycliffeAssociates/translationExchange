import React from "react";
import ReactDOM from "react-dom";



describe("Record comments array", () => {
	it("check if the comments positions are inverted for the purpose of displaying newest to oldest comments", () => {

		const data = [{
			comment: {
				"date_modified": "2003",
				"id": "294",
				"location": "media/dump/comments/1506953482.45e4fc0972-051a-413e-a206-c21835666181.mp3"
			}
		},
		{
			comment: {
				"date_modified": "2003",
				"id": "295",
				"location": "media/dump/comments/1506953482.45e4fc0972-051a-413e-a206-c21835666181.mp3"
			}
		},
		{
			comment: {
				"date_modified": "2003",
				"id": "296",
				"location": "media/dump/comments/1506953482.45e4fc0972-051a-413e-a206-c21835666181.mp3"
			}
		}


		];


		const invertedArray = data.slice(0).reverse();
		const idOriginal = data[0].comment.id;
		const idInverted = invertedArray[2].comment.id;


		expect(idOriginal).toEqual(idInverted);
	});

});
