import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
	App,
	AuthenticatedRoute,
	CreatePost,
	Home,
	ViewPost
} from 'containers';

export default () => (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />

		<Route component={AuthenticatedRoute}>
			<Route path="posts/create" component={CreatePost} />
		</Route>

		<Route path="post/:id" component={ViewPost} />
	</Route>
);
