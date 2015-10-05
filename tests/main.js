describe('Unit: MainController', function () {
	beforeEach(module('gwazoo.controllers'));

	var ctrl, scope;
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should initialize $scope.test as Hello World!', function () {
		expect(scope.test).toEqual("Hello World!");
	});
})