"use strict";

// long form
foo.$inject = ["$scope"];
Foo.$inject = ["$scope"];
    foo3.$inject = ["$scope"];
        foo4.$inject = ["$scope"];
foo5.$inject = ["$scope"];
            foo6.$inject = ["$scope"];
MyCtrl2.$inject = ["z"];
MyDirective2.$inject = ["$stateProvider"];
extprov.$inject = ["x"];
fooget.$inject = ["b"];
fooget2.$inject = ["c"];
Foo2.$inject = ["$scope"];
MyCtrl1.$inject = ["a", "b"];
MyDirective.$inject = ["$stateProvider"];
angular.module("MyMod").controller("MyCtrl", ["$scope", "$timeout", ($scope, $timeout) => {
}]);

// w/ dependencies
angular.module("MyMod", ["OtherMod"]).controller("MyCtrl", ["$scope", "$timeout", ($scope, $timeout) => {
}]);

// simple
myMod.controller("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.service("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.factory("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.directive("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.filter("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.animation("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.invoke("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.store("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.decorator("foo", ["$scope", "$timeout", ($scope, $timeout) => {
}]);
myMod.component("foo", {controller: ["$scope", "$timeout", ($scope, $timeout) => {}]});

// implicit config function
angular.module("MyMod", ["$interpolateProvider", $interpolateProvider => {}]);
angular.module("MyMod", ["OtherMod"], ["$interpolateProvider", $interpolateProvider => {}]);
angular.module("MyMod", ["OtherMod"], ["$interpolateProvider", $interpolateProvider => {}]).controller("foo", ["$scope", $scope => {}]);

// object property
var myObj = {};
myObj.myMod = angular.module("MyMod");
myObj.myMod.controller("foo", ["$scope", "$timeout", ($scope, $timeout) => { a }]);

// no dependencies => no need to wrap the function in an array
myMod.controller("foo", () => {
});
myMod.service("foo", () => {
});
myMod.factory("foo", () => {
});
myMod.directive("foo", () => {
});
myMod.filter("foo", () => {
});
myMod.animation("foo", () => {
});
myMod.invoke("foo", () => {
});
myMod.store("foo", () => {
});
myMod.decorator("foo", () => {
});
myMod.component("foo", {controller: () => {}});

// run, config don't take names
myMod.run(["$scope", "$timeout", ($scope, $timeout) => {
}]);
angular.module("MyMod").run(["$scope", $scope => {
}]);
myMod.config(["$scope", "$timeout", ($scope, $timeout) => {
}]);
angular.module("MyMod").config(() => {
});

// directive return object
myMod.directive("foo", ["$scope", $scope => ({
    controller: ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }]
})]);
myMod.directive("foo", ["$scope", $scope => ({
    controller: () => {
        bar;
    }
})]);

// provider, provider $get
myMod.provider("foo", ["$scope", function($scope) {
    this.$get = ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }];
    self.$get = ["$scope", $scope => {}];
    that.$get = ["$scope", $scope => {}];
    ignore.$get = $scope => {};
}]);
myMod.provider("foo", function() {
    this.$get = () => {
        bar;
    };
});
myMod.provider("foo", () => ({
    $get: ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }]
}));
myMod.provider("foo", () => ({
    $get: () => {
        bar;
    }
}));
myMod.provider("foo", {
    $get: ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }]
});
myMod.provider("foo", {
    $get: () => {
        bar;
    }
});
myMod.provider("foo", {
    "$get": ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }]
});
myMod.provider("foo", {
    '$get': ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }]
});

myMod.provider("foo", ["x", function(x) {
    this.$get = ["a", "b", (a, b) => {}];
}]);

myMod.provider("foo", extprov);
function extprov(x) {
    inner.$inject = ["c", "d"];
    this.$get = ["a", "b", (a, b) => {}];
    this.$get = fooget;
    this.$get = inner;

    function inner(c, d) {
    }
}

function fooget(b) {
    this.$get = fooget2;
}

function fooget2(c) {
}

// chaining
myMod.directive("foo", ["$a", "$b", ($a, $b) => {
    a;
}]).factory("foo", () => {
        b;
    }).config(["$c", $c => {
        c;
    }]).filter("foo", ["$d", "$e", ($d, $e) => {
        d;
    }]).animation("foo", ["$f", "$g", ($f, $g) => {
        e;
    }]).component("foo", {controller: ["$scope", "$timeout", ($scope, $timeout) => {
        i;
    }]
}).invoke("foo", ["$f", "$g", ($f, $g) => {
        f;
    }]).decorator("foo", ["$f", "$g", ($f, $g) => {
        g;
    }]).store("foo", ["$f", "$g", ($f, $g) => {
        h;
    }]);

angular.module("MyMod").directive("foo", ["$a", "$b", ($a, $b) => {
    a;
}]).provider("foo", () => ({
    $get: ["$scope", "$timeout", ($scope, $timeout) => {
        bar;
    }]
})).value("foo", "bar")
    .constant("foo", "bar")
    .bootstrap(element, [], {})
    .factory("foo", () => {
        b;
    }).config(["$c", $c => {
        c;
    }]).filter("foo", ["$d", "$e", ($d, $e) => {
        d;
    }]).animation("foo", ["$f", "$g", ($f, $g) => {
        e;
    }]).component("foo", {controller: ["$scope", "$timeout", ($scope, $timeout) => {
        i;
    }]
}).invoke("foo", ["$h", "$i", ($h, $i) => {
        f;
    }]).decorator("foo", ["$h", "$i", ($h, $i) => {
        g;
    }]).store("foo", ["$f", "$g", ($f, $g) => {
        h;
    }]);

// $provide
angular.module("myMod").controller("foo", () => {
    $provide.decorator("foo", ["$scope", $scope => {}]);
    $provide.service("foo", ["$scope", $scope => {}]);
    $provide.factory("foo", ["$scope", $scope => {}]);
    //$provide.provider
    $provide.provider("foo", ["$scope", function($scope) {
        this.$get = ["$scope", $scope => {}];
        return { $get: ["$scope", "$timeout", ($scope, $timeout) => {}]};
    }]);
    $provide.provider("foo", {
        $get: ["$scope", "$timeout", ($scope, $timeout) => {}]
    });
});
// negative $provide
function notInContext() {
    $provide.decorator("foo", $scope => {});
    $provide.service("foo", $scope => {});
    $provide.factory("foo", $scope => {});
    $provide.provider("foo", function($scope) {
        this.$get = $scope => {};
        return { $get: ($scope, $timeout) => {}};
    });
    $provide.provider("foo", {
        $get: ($scope, $timeout) => {}
    });
}

// $controllerProvider
angular.module("myMod").controller("foo", () => {
    $controllerProvider.register("foo", ["$scope", $scope => {}]);
});
function notInContext() {
    $controllerProvider.register("foo", $scope => {});
}

// all the patterns below matches only when we're inside a detected angular module
angular.module("MyMod").directive("pleasematchthis", () => {

    // $injector.invoke
    $injector.invoke(["$compile", $compile => {
        $compile(myElement)(scope);
    }]);

    // $httpProvider
    $httpProvider.interceptors.push(["$scope", $scope => { a }]);
    $httpProvider.responseInterceptors.push(["$scope", $scope => { a }], ["a", "b", (a, b) => { b }], () => { c });

    // $routeProvider
    $routeProvider.when("path", {
        controller: ["$scope", $scope => { a }]
    }).when("path2", {
            controller: ["$scope", $scope => { b }],
            resolve: {
                zero: () => { a },
                more: ["$scope", "$timeout", ($scope, $timeout) => { b }],
                something: "else",
            },
            dontAlterMe: arg => {},
        });

    // ui-router
    $stateProvider.state("myState", {
        resolve: {
            simpleObj: () => { a },
            promiseObj: ["$scope", "$timeout", ($scope, $timeout) => { b }],
            translations: "translations",
        },
        params: {
            simple: ["$scope", $scope => {}],
            inValue: { value: ["$scope", $scope => {}], notThis: $scope => {}},
        },
        views: {
            viewa: {
                controller: ["$scope", "myParam", ($scope, myParam) => {}],
                controllerProvider: ["$stateParams", $stateParams => {}],
                templateProvider: ["$scope", $scope => {}],
                dontAlterMe: arg => {},
                resolve: {
                    myParam: ["$stateParams", $stateParams => $stateParams.paramFromDI]
                },
            },
            viewb: {
                dontAlterMe: arg => {},
                templateProvider: ["$scope", $scope => {}],
                controller: ["$scope", $scope => {}],
            },
            dontAlterMe: null,
        },
        controller: ["$scope", "simpleObj", "promiseObj", "translations", ($scope, simpleObj, promiseObj, translations) => { c }],
        controllerProvider: ["$scope", $scope => { g }],
        templateProvider: ["$scope", $scope => { h }],
        onEnter: ["$scope", $scope => { d }],
        onExit: ["$scope", $scope => { e }],
        dontAlterMe: arg => { f },
    }).state("myState2", {
            controller: ["$scope", $scope => {}],
        }).state({
            name: "myState3",
            controller: ["$scope", "simpleObj", "promiseObj", "translations", ($scope, simpleObj, promiseObj, translations) => { c }],
        });
    $urlRouterProvider.when("/", ["$match", $match => { a; }]);
    $urlRouterProvider.otherwise("", a => { a; });
    $urlRouterProvider.rule(a => { a; }).anything().when("/", ["$location", $location => { a; }]);

    stateHelperProvider.setNestedState({
        controller: ["$scope", "simpleObj", "promiseObj", "translations", ($scope, simpleObj, promiseObj, translations) => { c }],

        children: [
            {
                name: "a",
                controller: ["a", a => {}],
                resolve: {
                    f: ["$a", $a => {}],
                },
                children: [
                    {
                        name: "ab",
                        controller: ["ab", ab => {}],
                        resolve: {
                            f: ["$ab", $ab => {}],
                        },
                        children: [
                            {
                                name: "abc",
                                controller: ["abc", abc => {}],
                                resolve: {
                                    f: ["$abc", $abc => {}],
                                },
                            },
                        ],
                    },
                ],
            },
            {
                name: "b",
                controller: ["b", b => {}],
                views: {
                    viewa: {
                        controller: ["$scope", "myParam", ($scope, myParam) => {}],
                        controllerProvider: ["$stateParams", $stateParams => {}],
                        templateProvider: ["$scope", $scope => {}],
                        dontAlterMe: arg => {},
                        resolve: {
                            myParam: ["$stateParams", $stateParams => $stateParams.paramFromDI]
                        },
                    },
                    viewb: {
                        dontAlterMe: arg => {},
                        templateProvider: ["$scope", $scope => {}],
                        controller: ["$scope", $scope => {}],
                    },
                    dontAlterMe: null,
                },
            },
        ],
    });
    stateHelperProvider.setNestedState({
        controller: ["$scope", "simpleObj", "promiseObj", "translations", ($scope, simpleObj, promiseObj, translations) => { c }],
    }, true);

    // angular ui / ui-bootstrap $modal
    $modal.open({
        templateUrl: "str",
        controller: ["$scope", $scope => {}],
        resolve: {
            items: ["MyService", MyService => {}],
            data: ["a", "b", (a, b) => {}],
            its: 42,
        },
        donttouch: me => {},
    });
    $uibModal.open({
        templateUrl: "str",
        controller: ["$scope", $scope => {}],
        resolve: {
            items: ["MyService", MyService => {}],
            data: ["a", "b", (a, b) => {}],
            its: 42,
        },
        donttouch: me => {},
    });

    // angular material design $mdBottomSheet, $mdDialog, $mdToast
    $mdDialog.show({
        templateUrl: "str",
        controller: ["$scope", $scope => {}],
        resolve: {
            items: ["MyService", MyService => {}],
            data: ["a", "b", (a, b) => {}],
            its: 42,
        },
        donttouch: me => {},
    });
    $mdBottomSheet.show({
        templateUrl: "str",
        controller: ["$scope", $scope => {}],
        resolve: {
            items: ["MyService", MyService => {}],
            data: ["a", "b", (a, b) => {}],
            its: 42,
        },
        donttouch: me => {},
    });
    $mdToast.show({
        templateUrl: "str",
        controller: ["$scope", $scope => {}],
        resolve: {
            items: ["MyService", MyService => {}],
            data: ["a", "b", (a, b) => {}],
            its: 42,
        },
        donttouch: me => {},
    });
});

// none of the patterns below matches because they are not in an angular module context
// this should be a straight copy of the code above, with identical copies in
// with_annotations.js
foobar.irrespective("dontmatchthis", () => {

    // $injector.invoke
    $injector.invoke($compile => {
        $compile(myElement)(scope);
    });

    // $httpProvider
    $httpProvider.interceptors.push($scope => { a });
    $httpProvider.responseInterceptors.push($scope => { a }, (a, b) => { b }, () => { c });

    // $routeProvider
    $routeProvider.when("path", {
        controller: $scope => { a }
    }).when("path2", {
        controller: $scope => { b },
        resolve: {
            zero: () => { a },
            more: ($scope, $timeout) => { b },
            something: "else",
        },
        dontAlterMe: arg => {},
    });

    // ui-router
    $stateProvider.state("myState", {
        resolve: {
            simpleObj: () => { a },
            promiseObj: ($scope, $timeout) => { b },
            translations: "translations",
        },
        views: {
            viewa: {
                controller: ($scope, myParam) => {},
                controllerProvider: $stateParams => {},
                templateProvider: $scope => {},
                dontAlterMe: arg => {},
                resolve: {
                    myParam: $stateParams => $stateParams.paramFromDI
                },
            },
            viewb: {
                dontAlterMe: arg => {},
                templateProvider: $scope => {},
                controller: $scope => {},
            },
            dontAlterMe: null,
        },
        controller: ($scope, simpleObj, promiseObj, translations) => { c },
        controllerProvider: $scope => { g },
        templateProvider: $scope => { h },
        onEnter: $scope => { d },
        onExit: $scope => { e },
        dontAlterMe: arg => { f },
    }).state("myState2", {
        controller: $scope => {},
    }).state({
        name: "myState3",
        controller: ($scope, simpleObj, promiseObj, translations) => { c },
    });
    $urlRouterProvider.when("/", $match => { a; });
    $urlRouterProvider.otherwise("", a => { a; });
    $urlRouterProvider.rule(a => { a; }).anything().when("/", $location => { a; });

    stateHelperProvider.setNestedState({
        controller: ($scope, simpleObj, promiseObj, translations) => { c },

        children: [
            {
                name: "a",
                controller: a => {},
                resolve: {
                    f: $a => {},
                },
                children: [
                    {
                        name: "ab",
                        controller: ab => {},
                        resolve: {
                            f: $ab => {},
                        },
                        children: [
                            {
                                name: "abc",
                                controller: abc => {},
                                resolve: {
                                    f: $abc => {},
                                },
                            },
                        ],
                    },
                ],
            },
            {
                name: "b",
                controller: b => {},
                views: {
                    viewa: {
                        controller: ($scope, myParam) => {},
                        controllerProvider: $stateParams => {},
                        templateProvider: $scope => {},
                        dontAlterMe: arg => {},
                        resolve: {
                            myParam: $stateParams => $stateParams.paramFromDI
                        },
                    },
                    viewb: {
                        dontAlterMe: arg => {},
                        templateProvider: $scope => {},
                        controller: $scope => {},
                    },
                    dontAlterMe: null,
                },
            },
        ],
    });
    stateHelperProvider.setNestedState({
        controller: ($scope, simpleObj, promiseObj, translations) => { c },
    }, true);

    // angular ui / ui-bootstrap $modal
    $modal.open({
        templateUrl: "str",
        controller: $scope => {},
        resolve: {
            items: MyService => {},
            data: (a, b) => {},
            its: 42,
        },
        donttouch: me => {},
    });
    $uibModal.open({
        templateUrl: "str",
        controller: $scope => {},
        resolve: {
            items: MyService => {},
            data: (a, b) => {},
            its: 42,
        },
        donttouch: me => {},
    });

    // angular material design $mdBottomSheet, $mdDialog, $mdToast
    $mdDialog.show({
        templateUrl: "str",
        controller: $scope => {},
        resolve: {
            items: MyService => {},
            data: (a, b) => {},
            its: 42,
        },
        donttouch: me => {},
    });
    $mdBottomSheet.show({
        templateUrl: "str",
        controller: $scope => {},
        resolve: {
            items: MyService => {},
            data: (a, b) => {},
            its: 42,
        },
        donttouch: me => {},
    });
    $mdToast.show({
        templateUrl: "str",
        controller: $scope => {},
        resolve: {
            items: MyService => {},
            data: (a, b) => {},
            its: 42,
        },
        donttouch: me => {},
    });
});

// explicit annotations
var x = /* @ngInject */ ["$scope", $scope => {
}];

var obj = {};
obj.bar = /*@ngInject*/ ["$scope", $scope => {}];

obj = {
    controller: /*@ngInject*/ ["$scope", $scope => {}],
};

obj = /*@ngInject*/ {
    foo: ["a", a => {}],
    bar: ["b", "c", (b, c) => {}],
    val: 42,
    inner: {
        circle: ["d", d => {}],
        alalalala: "long",
    },
    nest: { many: {levels: ["x", x => {}]}},
    but: { onlythrough: ["object literals", {donttouch: me => {}}]},
};

obj = {
    /*@ngInject*/
    foo: ["a", a => {}],
    bar: (b, c) => {},
};

/*@ngInject*/
obj = {
    foo: ["a", a => {}],
    bar: ["b", "c", (b, c) => {}],
    val: 42,
    inner: {
        circle: ["d", d => {}],
        alalalala: "long",
    },
    nest: { many: {levels: ["x", x => {}]}},
    but: { onlythrough: ["object literals", {donttouch: me => {}}]},
};

/*@ngInject*/
var obj = {
    foo: ["a", a => {}],
    bar: ["b", "c", (b, c) => {}],
    val: 42,
    inner: {
        circle: ["d", d => {}],
        alalalala: "long",
    },
    nest: { many: {levels: ["x", x => {}]}},
    but: { onlythrough: ["object literals", {donttouch: me => {}}]},
};

// @ngInject
function foo($scope) {
}

// @ngInject
// otherstuff
function Foo($scope) {
}

// @ngInject
// has trailing semicolon
var foo1 = $scope => {
};
foo1.$inject = ["$scope"];

// @ngInject
// lacks trailing semicolon
var foo2 = $scope => {
}
foo2.$inject = ["$scope"];

// @ngInject
// has trailing semicolon
bar.foo1 = $scope => {
};
bar.foo1.$inject = ["$scope"];

// @ngInject
// lacks trailing semicolon
bar.foo2 = $scope => {
}
bar.foo2.$inject = ["$scope"];

// let's zip-zag indentation to make sure that the $inject array lines up properly
    // @ngInject
    function foo3($scope) {}
        // @ngInject
        function foo4($scope) {
        }
/* @ngInject */ function foo5($scope) {}
            /* @ngInject */ function foo6($scope) {
            }

    // @ngInject
    var foo7 = $scope => {
    };
    foo7.$inject = ["$scope"];
        // @ngInject
        var foo8 = $scope => {};
        foo8.$inject = ["$scope"];
// @ngInject
var foo9 = $scope => {
}
foo9.$inject = ["$scope"];
// @ngInject
            var foo10 = $scope => {}
            foo10.$inject = ["$scope"];

/* @ngInject */ var foo11 = $scope => {
    };
    foo11.$inject = ["$scope"];
        /* @ngInject */var foo12 = $scope => {};
        foo12.$inject = ["$scope"];
/* @ngInject */var foo13 = $scope => {
}
foo13.$inject = ["$scope"];
/* @ngInject */var foo14 = $scope => {}
foo14.$inject = ["$scope"];

// adding an explicit annotation where it isn't needed should work fine
myMod.controller("foo", /*@ngInject*/ ["$scope", "$timeout", ($scope, $timeout) => {
}]);


// explicit annotations using ngInject() instead of /*@ngInject*/
var x = ngInject(["$scope", $scope => {}]);

obj = ngInject({
    foo: ["a", a => {}],
    bar: ["b", "c", (b, c) => {}],
    val: 42,
    inner: {
        circle: ["d", d => {}],
        alalalala: "long",
    },
    nest: { many: {levels: ["x", x => {}]}},
    but: { onlythrough: ["object literals", {donttouch: me => {}}]},
});


// explicit annotations using "ngInject" Directive Prologue
function Foo2($scope) {
    "ngInject";
}

var foos3 = $scope => {
    // comments are ok before the Directive Prologues
    // and there may be multiple Prologues
    "use strict"; "ngInject";
};
foos3.$inject = ["$scope"];

var dual1 = a => { "ngInject" }, dual2 = b => { "ngInject" };
dual1.$inject = ["a"];
dual2.$inject = ["b"];

g(["c", c => {
    "ngInject"
}]);

// Traceur class output example
// class C {
//     constructor($scope) {
//         "ngInject"
//     }
// }
$traceurRuntime.ModuleStore.getAnonymousModule(() => {
    "use strict";
    var C = $scope => {
        "ngInject";
    };
    C.$inject = ["$scope"];
    ($traceurRuntime.createClass)(C, {}, {});
    return {};
});


// suppress false positives with /*@ngNoInject*/, ngNoInject() and "ngNoInject"
myMod.controller("suppressed", /*@ngNoInject*/$scope => {
});
myMod.controller("suppressed", ngNoInject($scope => {
}));
myMod.controller("suppressed", $scope => {
    "ngNoInject";
});

// works the same as ngInject i.e. reference-following, IIFE-jumping and so on
/*@ngNoInject*/
myMod.controller("suppressed", SupFoo3);
var SupFoo3 = ngNoInject($scope => {
    "ngNoInject";
});


// regression-test for https://github.com/olov/ng-annotate/issues/221
var FooBar = (_super => {
    __extends(FooBar, _super);
    /*@ngInject*/
    FooBar.$inject = ["$a", "$b"];
    function FooBar($a, $b) {
        _super.call(this);
    }
    /*@ngInject*/
    FooBar.onEnter = callback => {
        x;
    };
    FooBar.onEnter.$inject = ["callback"];
    return FooBar;
})(Bar);
var FooBar2 = (_super => {
    __extends(FooBar, _super);
    FooBar.$inject = ["$a", "$b"];
    function FooBar($a, $b) {
        "ngInject";
        _super.call(this);
    }
    FooBar.onEnter = ["callback", callback => {
        "ngInject";
        x;
    }];
    return FooBar;
})(Bar);

// snippets that shouldn't fool ng-annotate into generating false positives,
//   whether we're inside an angular module or not
myMod.controller("donttouchme", () => {
    // lo-dash regression that happened in the brief time frame when
    // notes (instad of "notes") would match. see issue #22
    var notesForCurrentPage = _.filter(notes, note => note.page.uid === page.uid);
});

// not a module declaration short-form, see https://github.com/olov/ng-annotate/issues/82
$stateProvider.decorator('parent', (state, parentFn) => {
  doStuff();
});

// $get is only valid inside provider
myMod.service("donttouch", function() {
    this.$get = me => {
    };
});
myMod.service("donttouch", mefn);
function mefn() {
    this.$get = me => {
    };
}

// directive return object is only valid inside directive
myMod.service("donttouch", () => ({
    controller: ($scope, $timeout) => {
        bar;
    }
}));

myMod.directive("donttouch", () => {
    foo.decorator("me", ["$scope", $scope => {
    }]);
});

// IIFE-jumping (primarily for compile-to-JS langs)
angular.module("MyMod").directive("foo", ["$a", "$b", function($a, $b) {
    $uibModal.open({
        resolve: {
            collection: (_this => ["$c", $c => {
            }])(this),
        },
    });
}]);

var x = /*@ngInject*/ (() => ["$a", $a => {
}])();

// IIFE-jumping with reference support
var myCtrl = (() => $scope => {
})();
myCtrl.$inject = ["$scope"];
angular.module("MyMod").controller("MyCtrl", myCtrl);


// advanced IIFE-jumping (with reference support)
var myCtrl10 = (() => {
    "use strict";
    // the return statement can appear anywhere on the functions topmost level,
    // including before the myCtrl function definition
    myCtrl.$inject = ["$scope"];
    return myCtrl;
    function myCtrl($scope) {
        foo;
    }
    post;
})();
angular.module("MyMod").controller("MyCtrl", myCtrl10);

var myCtrl11 = (() => {
    pre;
    var myCtrl = $scope => {
        foo;
    };
    myCtrl.$inject = ["$scope"];
    mid;
    // the return statement can appear anywhere on the functions topmost level,
    // including before the myCtrl function definition
    return myCtrl;
    post;
})();
angular.module("MyMod").controller("MyCtrl", myCtrl11);


// reference support
function MyCtrl1(a, b) {
}
if (true) {
    // proper scope analysis including shadowing
    let MyCtrl1 = c => {
    };
    MyCtrl1.$inject = ["c"];
    angular.module("MyMod").directive("foo", MyCtrl1);
}
angular.module("MyMod").controller("bar", MyCtrl1);
function MyCtrl2(z) {
}
funcall(/*@ngInject*/ MyCtrl2); // explicit annotation on reference flows back to definition

angular.module("MyMod").directive("foo", MyDirective);

function MyDirective($stateProvider) {
    $stateProvider.state('astate', {
        resolve: {
            yoyo: ["ma", ma => {
            }],
        }
    });
}

/* @ngInject */
function MyDirective2($stateProvider) {
    $stateProvider.state('astate', {
        resolve: {
            yoyo: ["ma", ma => {
            }],
        }
    });
}

// issue 84
(() => {
    var MyCtrl = $someDependency => {};
    MyCtrl.$inject = ["$someDependency"];
    angular.module('myApp').controller("MyCtrl", MyCtrl);
    MyCtrl.prototype.someFunction = () => {};
})();

// empty var declarator
var MyCtrl12;
angular.module("MyMod").controller('MyCtrl', MyCtrl12);

// issue 115
module.exports = () => {
    "use strict";
    return {
        restrict: 'E',
        replace: true,
        scope: { },
        controller: /*@ngInject*/["$scope", "myService", ($scope, myService) => {
        }],
        templateUrl: "mytemplate"
    };
};

// issue #135
var MyCtrl = (() => {
    /*@ngInject*/
    MyCtrl.$inject = ["a"];
    function MyCtrl(a) {
    }

    return MyCtrl;
})();

myMod.service("a", MyCtrl);

import "foo";
export const bar = "";

// NOT IMPLEMENTED FOR ARROW FUNCTIONS:
/* @ngInject */
export default $scope => {}
