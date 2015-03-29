if (Meteor.isClient) {
	
  Template.parameters.helpers({	
    annualMiles: function () {
	  var params = Parameters.find().fetch();
	  var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles})
      return _.pluck(distinctParams, "annualMiles")
    },
	leaseStartDate: function(){
	  var params = Parameters.find().fetch();
	  var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles})		
	  return _.pluck(distinctParams, "leaseStartDate")
	}
  });

  Template.parameters.events({
	'submit form': function(e){
		e.preventDefault();
		
	  	var params = Parameters.find().fetch();
	  	var distinctParams = _.uniq(params, false, function (d) {return d.annualMiles})		
	  	var paramId = _.pluck(distinctParams, "_id").toString();
		
		var updateParams = {
			annualMiles: $(e.target).find('[name=annualMiles]').val(),
			leaseStartDate: $(e.target).find('[name=leaseStartDate]').val()
		}
		
		console.log(paramId);
		console.log(updateParams);
		Parameters.update({_id: paramId}, {$set: updateParams});	
		
		//var annualMiles = e.target.annualMiles.value;
		//var leaseStartDate = e.target.leaseStartDate.value;
		
		//console.log("annualMiles = " + annualMiles);
		//console.log("leaseStartDate = " + leaseStartDate)	
	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	if (Parameters.find().count() === 0){
		// Set default properties
		Parameters.insert(
			{annualMiles: '12000',
			leaseStartDate: '1/1/2014'});
	}
  });
}
