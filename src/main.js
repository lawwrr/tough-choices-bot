import 'assets/reset.css';

import {render} from 'react-dom';
import React from 'react';
import changeCase from 'change-case';

import layoutGetter from 'getter/layout';
import getValues from 'lib/getValues';
import random from 'lib/random';



let $posts = [];
let posts = [];
let layouts = new layoutGetter().layouts;

const makePost = function() {

	let values = getValues();
	let layout = new layoutGetter().value;

	System.import('component/'+changeCase.pascal(`${layout.name}-post`))
	.then(Post => {

		let $post = React.createElement(
			Post,
			{
				photoQuery: values.query,
				choices: values.choices,
				extras: [],
				variants: [],
				key: $posts.length
			}
		);

		$posts.push($post);
		posts.push({
			photoQuery: $post.props.photoQuery,
			choices: $post.props.choices,
			layout: layout.name,
			$element: $post
		});

		render(React.createElement(
			'div',
			null,
			$posts
		),document.getElementById('tough-choices-bot'));

	})
	.catch(console.error);

};


export default (function(){

	let lib = {};
	lib.makePost = makePost;
	lib.getValues = getValues;
	lib.posts = posts;
	lib.posts = layouts;

	/*make app container*/
	let $app = document.createElement('div');
	$app.id= 'tough-choices-bot';
	document.body.appendChild($app);

	/*linked bc phantomjs is OLD*/
	let link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Roboto:400,400b|Gentium+Book+Basic:700|Patrick+Hand|Poiret+One|Roboto+Mono:500|Lato:700';
	link.rel = 'stylesheet';
	document.querySelector('head').appendChild(link);

	lib.makePost();

	return lib;

})();
