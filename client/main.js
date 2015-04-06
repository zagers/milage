Meteor.subscribe('parameters', {
	onReady: function() {
		var params = Parameters.find().fetch();
		var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles})		
		var annualMiles = _.pluck(distinctParams, "annualMiles").toString();
		var leaseStartDate = _.pluck(distinctParams, "leaseStartDate").toString();
		var newId = _.pluck(distinctParams, "_id").toString();
		Session.set('annualMiles', annualMiles);
		Session.set('leaseStartDate', leaseStartDate);
		Session.set('id', newId);
	}
});