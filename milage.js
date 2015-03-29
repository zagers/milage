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
		Parameters.insert(
			{annualMiles: '12000',
			leaseStartDate: '1/1/2014'});
		Session.set('annualMiles', '12000');
		Session.set('leaseStartDate', '1/1/2014');
	}
  });
}
