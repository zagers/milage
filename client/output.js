Template.output.helpers({	
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