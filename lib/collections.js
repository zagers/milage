Parameters = new Mongo.Collection("parameters");
Parameters.attachSchema(new SimpleSchema({
	annualMiles: {
		type: String,
		label: "Annual Milage",
		max: 6
	},
	leaseStartDate: {
		type: String,
		label: "Lease Start Date",
		max: 10
	}
}));