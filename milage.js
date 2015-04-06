if (Meteor.isClient) {	
	
  Template.parameters.helpers({	
    annualMiles: function () {
	  var params = Parameters.find().fetch();
	  var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles});
	  Session.set('annualMiles', _.pluck(distinctParams, "annualMiles") );
      return _.pluck(distinctParams, "annualMiles")
    },
	leaseStartDate: function(){
	  var params = Parameters.find().fetch();
	  var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles});		
	  Session.set('leaseStartDate', _.pluck(distinctParams, "leaseStartDate"));
	  return _.pluck(distinctParams, "leaseStartDate")
	},
	currentDate: function(){
		return moment().format("DD-MMM-YYYY");
	},
	allowedMiles: function(){
		var annualMiles = parseInt(Session.get('annualMiles'));
		var leaseStartDate = moment(Session.get('leaseStartDate'), 'M-D-YYYY');

		// Calculate daily Milage Allowance (Annual Miles / days in a year)
		var dailyMiles = annualMiles / 365;
		
		// How many days has it been since lease started?
		var daysSinceLeaseStarted = moment().diff(leaseStartDate, 'days'); 
		
		// Milage allowance is # of days since lease * daily milage allowance
		return Math.round(daysSinceLeaseStarted * dailyMiles);		
	}	
  });

  Template.parameters.events({
	'submit form': function(e){
		e.preventDefault();
		
	  	var params = Parameters.find().fetch();
	  	var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles})		
	  	var paramId = _.pluck(distinctParams, "_id").toString();
		
		var am = $(e.target).find('[name=annualMiles]').val();
		var lsd = $(e.target).find('[name=leaseStartDate]').val();
		
		var updateParams = {
			annualMiles: am,
			leaseStartDate: lsd
		}
		
		Session.set('annualMiles', am);
		Session.set('leaseStartDate', lsd);
		
		Parameters.update({_id: paramId}, {$set: updateParams});	
	}
  });
}

if (Meteor.isServer) {

  Meteor.startup(function () {
	if (Parameters.find().count() === 0){
		// Set default properties
		var id = Parameters.insert(
			{annualMiles: '12000',
			leaseStartDate: '1/1/2014'});
		Session.set('annualMiles', '12000');
		Session.set('leaseStartDate', '1/1/2014');
		Session.set('id', id);
	}
  });

/*  Picker.route('/milage', function(params, req, res, next){
	var params = Parameters.find().fetch();
	var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles})		
	var annualMiles = _.pluck(distinctParams, "annualMiles").toString();
	var leaseStartDate = _.pluck(distinctParams, "leaseStartDate").toString();

	// Calculate daily Milage Allowance (Annual Miles / days in a year)
	var dailyMiles = annualMiles / 365;
	// How many days has it been since lease started?
	var daysSinceLeaseStarted = moment().diff(leaseStartDate, 'days'); 
	// Milage allowance is # of days since lease * daily milage allowance
	var allowance = Math.round(daysSinceLeaseStarted * dailyMiles);		

	var returnObject = {
		annualMiles: annualMiles,
		leaseStartDate: leaseStartDate,
		allowance: allowance
	};

	res.end(JSON.stringify(returnObject));
  });
*/

}