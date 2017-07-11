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
    vm.rating = 0; vm.showBrowse = true;

    $http.get('data.json').success(function (data) {
        vm.doctorsList = data.doctors;
    });

    vm.filterDoctor = function () {
        if(vm.searchDoc) {
            return function (docObj) {
                let nameMatch = false, specialityMatch = false, titleMatch = false;
                const name = docObj.name.toLowerCase(),
                  specialityArray = docObj.specialties, searchDoc = vm.searchDoc.toLowerCase(), title = docObj.title.toLowerCase();
                if (name.includes(searchDoc)) {
                    nameMatch = true;
                }
                if (title.includes(searchDoc)) {
                    titleMatch = true;
                }
                for (index in specialityArray) {
                    if (specialityArray[index].includes(searchDoc)) {
                        specialityMatch = true;
                        break;
                    }
                }
                return (nameMatch || specialityMatch || titleMatch) && filterRating(docObj);

            }
        }

    };

    vm.filterLocation = function() {
        if(vm.searchLocation) {
            return function (docObj) {
                if (vm.searchLocation) {
                    let location = docObj.area.toLowerCase(), locationMatch = false;
                    if (location.includes(vm.searchLocation.toLowerCase())) {
                        locationMatch = true;
                    }
                    return locationMatch && filterRating(docObj);
                }
            }
        }
    };

    vm.showDoctorDetails = function (docObj) {
        vm.showBrowse = false;
        vm.selectedDoctor = docObj;
        vm.similarDoctorsList = [];
        let selectedSpecialities = vm.selectedDoctor.specialties, selectedTitle = vm.selectedDoctor.title.split('/');

        console.log(vm.doctorsList)

        for(let i = 0; i<vm.doctorsList.length; i++) {

            let similarDoctor = vm.doctorsList[i];
              if(similarDoctor.unique_id === vm.selectedDoctor.unique_id) {continue;}
            let similarSpecialites = similarDoctor.specialties.toString().toLowerCase(),
              similarTitle = similarDoctor.title.split('/').toString().toLowerCase(), similar = false, sameLocation = false;
            if(vm.selectedDoctor.area === similarDoctor.area) {sameLocation = true;}
            for(let j in selectedTitle) {
                if (similarTitle.includes(selectedTitle[j].toLowerCase()) && sameLocation) {
                    vm.similarDoctorsList.push(similarDoctor);
                    similar = true;
                    break;
                }
            }

            if(!similar) {
                for(let j in selectedSpecialities) {
                    if(similarSpecialites.includes(selectedSpecialities[j].toLowerCase()) && sameLocation) {
                        vm.similarDoctorsList.push(similarDoctor);
                        break;
                    }
                }
            }

        }

        vm.similarDoctorsList.sort(function(a,b) {
            return b.rating - a.rating;
        });

        console.log(vm.similarDoctorsList);
    };


     function filterRating(docObj) {
         if(vm.rating === 0) {
             return true;
         }
         return docObj.rating >= vm.rating;
    }


    vm.clearFilters = function () {
        vm.searchDoc = "";
        vm.searchLocation = "";
        vm.rating = '';
    }
}

