'use strict';
angular.module('gwazoo.services', [])

.service('Account', function($q, $http, $rootScope) {
	this.login = function() {
		$http.post('/api')
	}

	this.register = function() {
		$http.post('/api/create').then(function(res) {
			if(!res) {
				alert()
			}
			console.log(res);
			user = res;
		})
	}
})

