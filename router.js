Router.configure({
	layoutTemplate: 'main'
});
Router.route("root", {
	path: '/',
	data: function(){
		return Parameters.findOne({_id: Session.get('id')});
	},
	template: 'parameters'
});