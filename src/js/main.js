angular
  .module('angularAddresses', [])

  .controller('Main', function () {
    var vm = this;

    vm.people = [
      {name: 'Ben', twitter: '@ben123', phone: '8675309'},
      {name: 'Dan', twitter: '@dandan', phone: '8675309'},
      {name: 'Elsa', twitter: '@letitgo', phone: '8675309'},
      {name: 'Amanda', twitter: '@princessamanda', phone: '8675309'},
      {name: 'Charity', twitter: '@nonprofit', phone: '8675309'}
    ];

    vm.newPerson = {};

    vm.addNewContact = function(){
      vm.people.push(vm.newPerson);
      vm.newPerson = {};
    }

    vm.removeContact=function(person){
      var index = vm.people.indexOf(person);
      vm.people.splice(index, 1);
    }
  });
