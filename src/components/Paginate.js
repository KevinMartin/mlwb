import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Paginate = ({ hasPrev, hasNext, page, pushState, routeTemplate }) => (
	<div className="clearfix">
		{ hasPrev
			? <button
				className="btn btn-default pull-left"
				onClick={() => pushState(routeTemplate.replace('{page}', page - 1))}>
				Newer Posts
			</button>
			: null }
		{ hasNext
			? <button
				className="btn btn-default pull-right"
				onClick={() => pushState(routeTemplate.replace('{page}', page + 1))}>
				Older Posts
			</button> : null }
	</div>
);

Paginate.propTypes = {
	hasPrev: PropTypes.bool,
	hasNext: PropTypes.bool,
	page: PropTypes.number.isRequired,
	pushState: PropTypes.func.isRequired,
	routeTemplate: PropTypes.string.isRequired
};

Paginate.defaultProps = {
	hasPrev: false,
	hasNext: false
};

export default connect(() => ({}), { pushState: push })(Paginate);
