let app = angular.module('similarDoctorsApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/doctors',{
        templateUrl:'doctor-profile.html',
        controller: 'homeController'
    })
        .otherwise({redirectTo: '/'});


}]);

app.controller('homeController',homeController);

homeController.$inject = ['$http'];

function homeController($http) {
    let vm = this;

    $http.get('data.json').success(function (data) {
        vm.doctorsList = data.doctors;
        console.log(vm.doctorsList);
    });

    vm.filterDoctor = function () {
        if(vm.searchDoc || vm.searchLocation || vm.rating) {
            return function (docObj) {
                console.log("Executing this");
                let nameMatch = false, specialityMatch = false, locationMatch = false, ratingMatch = false;
                if (vm.searchDoc) {
                    let name = docObj.name.toLowerCase(),
                        specialityArray = docObj.specialties, searchDoc = vm.searchDoc.toLowerCase();
                    if (name.includes(searchDoc)) {
                        nameMatch = true;
                    }
                    for (index in specialityArray) {
                        if (specialityArray[index].includes(searchDoc)) {
                            specialityMatch = true;
                            break;
                        }
                    }
                }

                if (vm.searchLocation) {
                    let location = docObj.area.toLowerCase();
                    if (location.includes(vm.searchLocation.toLowerCase())) {
                        locationMatch = true;
                    }
                }

                if(vm.rating) {
                    if(vm.rating === 'threeandhalf') {
                        ratingMatch = docObj.rating >= 3.5;
                    } else if(vm.rating === 'four') {
                        ratingMatch = docObj.rating >= 4;
                    } else if(vm.rating === 'fourandhalf') {
                        ratingMatch = docObj.rating >=4.5;
                    }
                }

                return (nameMatch || specialityMatch || locationMatch || ratingMatch);
            }
        }
    };

    vm.clearFilters = function () {
        vm.searchDoc = "";
        vm.searchLocation = "";
        vm.rating = '';
    }
}

