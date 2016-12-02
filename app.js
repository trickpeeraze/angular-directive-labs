var app = angular.module('app', []);

app.controller('mainController', ($scope) => {
	$scope.mainText = '123 mainController';
	$scope.$watch('d1Text', (v) => { 
		console.log('mainController d1Text', v);
	});
});

app.directive('d1', () => {
	return {
		require: {
			d3: '?d3',
			d1: '?d1'
		},
		scope: {
			data: '='
		},
		
		bindToController: true,
		controllerAs: 'vm',

		controller ($scope, $element, $transclude, $attrs) {
			var vm = this;

			vm.d1Text = '4567';
			vm.setBoxFocus = function () {};
			vm.$onInit = function () {
				console.log('$onInit()');
			};
			vm.$postLink = function () {
				console.log('$postLink()');
			};
			vm.$doCheck = function () {
				console.log('$doCHeck()');
			};
			vm.$onChanges = function () {
				console.log('$onChanges()');
			};
			vm.$onDestroy = function () {
				console.log('$onDestroy()');
			};

			console.log('<d1> controller', vm.data);			
		},
		compile (tElement) {
			console.log('<d1> complie');
			return {
				pre ($scope) {
					console.log('<d1> pre link', $scope.d1Text);
				},
				post ($scope, $element, attr, controllers, $transclude) {
					// d3.showAlert();
					$element.addClass('outer');
					console.log('attributes', attr);
					console.log('<d1> post link');
				}
			};
		},
		template: '<d2></d2>'
	};
});

app.directive('d2', () => {
	return {
		controller () {
			console.log('<d2> controller');
		},
		compile () {
			console.log('<d2> complie');
			return {
				pre () {
					console.log('<d2> pre link');
				},
				post ($scope, $ele) {
					console.log('<d2> post link');
					$ele.css('fontWeight', 'bold');
				}
			};
		},
		templateUrl: 't1.html'
	};
});

app.directive('d3', () => {
	return {
		controller: function () {
			this.showAlert = function () {
				alert('alert from <d3>');
			};
			console.log('<d3> controller');
		},
		compile () {
			console.log('<d3> complie');
			return {
				pre () {
					console.log('<d3> pre link');
				},
				post () {
					console.log('<d3> post link');
				}
			};
		}
	};
});
