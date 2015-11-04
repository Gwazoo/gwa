'use strict';
angular.module('gwazoo.services')

.service('Subdomain', function ($location) {
	this.get = function () {
		if ( $location.host().indexOf('.') == -1 ) {
	      return "No Sponsor";
	    } else {
	      return $location.host().split('.')[0];
	    }
	} 
});